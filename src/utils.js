const importFrom = require('import-from');
const fs = require('fs');
const ANSIToHtml = require('ansi-to-html');

const getPackageJson = packageJsonPath => {
  let path = packageJsonPath;
  if (!path || !fs.existsSync(path)) {
    path = process.cwd();
  }

  const fileData = importFrom(path, './package.json');

  if (!fileData) {
    return {};
  }

  return {
    name: fileData.name,
    version: fileData.version,
    description: fileData.description,
    license: fileData.license,
    devDependencies: fileData.devDependencies,
    dependencies: fileData.dependencies,
  };
};

const FILE_TYPES = {
  JAVASCRIPT: 'javascript',
  CSS: 'css',
};

const isValidName = name => {
  if (!name) {
    return false;
  }

  return !(
    name.endsWith('.map') ||
    name.endsWith('.gz') ||
    name.endsWith('.map.js')
  );
};

const getFileType = name => {
  if (!isValidName(name)) {
    return '';
  }

  const extension = name.substring(name.lastIndexOf('.') + 1);

  switch (extension) {
    case 'js':
      return FILE_TYPES.JAVASCRIPT;

    case 'css':
      return FILE_TYPES.CSS;

    default:
      return '';
  }
};

const formateState = state => {
  const newState = state;
  const newFormat = { newline: true, escapeXML: true, colors: true };
  const formatter = new ANSIToHtml(newFormat);

  newState.warnings = newState.warnings.map(w => formatter.toHtml(w));
  newState.errors = newState.errors.map(e => formatter.toHtml(e));

  const dashboardState = {
    totalJSSize: 0,
    totalCSSSize: 0,
    totalStaticFileSize: 0,
    totalAssetsSize: 0,
    initialJSSize: 0,
    initialCSSSize: 0,
  };

  newState.assets.forEach(({ name, size }) => {
    if (!isValidName(name)) {
      return true;
    }

    const fileType = getFileType(name);

    if (fileType === FILE_TYPES.JAVASCRIPT) {
      dashboardState.totalJSSize += size;
    } else if (fileType === FILE_TYPES.CSS) {
      dashboardState.totalCSSSize += size;
    } else {
      dashboardState.totalStaticFileSize += size;
    }

    dashboardState.totalAssetsSize += size;
  });

  const entrypointCallBack = (acc, name) => {
    const asset = newState.assets.find(a => a.name === name);
    if (asset) {
      return acc + asset.size;
    }
    return acc;
  };

  Object.values(newState.entrypoints).forEach(({ assets }) => {
    const jsFiles = assets.filter(
      a => getFileType(a) === FILE_TYPES.JAVASCRIPT,
    );
    const cssFiles = assets.filter(a => getFileType(a) === FILE_TYPES.CSS);

    dashboardState.initialJSSize = jsFiles.reduce(entrypointCallBack, 0);
    dashboardState.initialCSSSize = cssFiles.reduce(entrypointCallBack, 0);
  });

  newState.dashboardState = dashboardState;

  return newState;
};

module.exports = {
  getPackageJson,
  formateState,
};
