const importFrom = require('import-from');
const fs = require('fs');
const ANSIToHtml = require('ansi-to-html');
const chalk = require('chalk');

const { computeAssetsState, removeUnusedAssetsData } = require('./assets');

const {
  computePackageSize,
  extractSubModules,
  computeModuleState,
  removeUnusedModuleData,
  removeUnusedChunkData,
} = require('./modules');

const getPackageJson = packageJsonPath => {
  let fileData = {};
  let path = packageJsonPath;

  try {
    if (!path || !fs.existsSync(path)) {
      path = process.cwd();
    }

    fileData = importFrom(path, './package.json') || {};
  } catch (e) {
    console.log(chalk.red(`Error in fetching package.json data`));
    console.log(chalk.red(e.message));
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

const removeUnusedStateData = state => {
  return {
    errors: state.errors,
    warnings: state.warnings,
    version: state.version,
    hash: state.hash,
    time: state.time,
    builtAt: state.builtAt,
    publicPath: state.publicPath,
    outputPath: state.outputPath,
    assets: removeUnusedAssetsData(state.assets),
    entrypoints: state.entrypoints,
    chunks: removeUnusedChunkData(state.chunks),
    modules: removeUnusedModuleData(extractSubModules(state.modules)),
  };
};

const formateState = state => {
  const newState = removeUnusedStateData(state);

  // errors and warnings
  const newFormat = { newline: true, escapeXML: true, colors: true };
  const formatter = new ANSIToHtml(newFormat);
  newState.warnings = newState.warnings.map(w => formatter.toHtml(w));
  newState.errors = newState.errors.map(e => formatter.toHtml(e));

  // modules
  newState.packageSize = computePackageSize(newState.modules);
  newState.moduleState = computeModuleState(newState);

  // assets
  newState.assetsState = computeAssetsState(newState);

  return newState;
};

module.exports = {
  getPackageJson,
  formateState,
};
