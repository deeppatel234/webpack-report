const importFrom = require('import-from');
const fs = require('fs');

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

module.exports = {
  getPackageJson,
};
