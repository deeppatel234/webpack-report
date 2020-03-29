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

const formateState = state => {
  const newState = state;
  const newFormat = { newline: true, escapeXML: true, colors: true };
  const formatter = new ANSIToHtml(newFormat);

  newState.warnings = newState.warnings.map(w => formatter.toHtml(w));
  newState.errors = newState.errors.map(e => formatter.toHtml(e));

  return state;
};

module.exports = {
  getPackageJson,
  formateState,
};
