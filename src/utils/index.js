const importFrom = require('import-from');
const fs = require('fs');
const ANSIToHtml = require('ansi-to-html');

const { computeAssetsState } = require('./assets');

const {
  computePackageSize,
  extractSubModules,
  removeSourceFromModule,
  computeModuleState,
  convertModulesByKey,
} = require('./modules');

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

  // errors and warnings
  const newFormat = { newline: true, escapeXML: true, colors: true };
  const formatter = new ANSIToHtml(newFormat);
  newState.warnings = newState.warnings.map(w => formatter.toHtml(w));
  newState.errors = newState.errors.map(e => formatter.toHtml(e));

  // modules
  newState.modules = extractSubModules(newState.modules);
  newState.modules = removeSourceFromModule(newState.modules);
  newState.packageSize = computePackageSize(newState.modules);
  newState.moduleState = computeModuleState(newState);
  // newState.modules = convertModulesByKey(newState.modules);

  // assets
  newState.assetsState = computeAssetsState(newState);

  return newState;
};

module.exports = {
  getPackageJson,
  formateState,
};
