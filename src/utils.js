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

const computePackageSize = moduleList => {
  const nodeModules = moduleList
    .filter(n => n.name.startsWith('./node_modules'))
    .map(n => {
      return {
        name: n.name.split('/')[2],
        module: n,
      };
    })
    .reduce((acc, n) => {
      const { totalSize, modules } = acc[n.name] || {
        totalSize: 0,
        modules: [],
      };

      return {
        ...acc,
        [n.name]: {
          totalSize: totalSize + n.module.size,
          modules: [...modules, n.module],
        },
      };
    }, {});

  return nodeModules;
};

const computeDashboardState = state => {
  const dashboardState = {
    totalJSSize: 0,
    totalCSSSize: 0,
    totalStaticFileSize: 0,
    totalAssetsSize: 0,
    initialJSSize: 0,
    initialCSSSize: 0,
  };

  state.assets.forEach(({ name, size }) => {
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

    return true;
  });

  const entrypointCallBack = (acc, name) => {
    const asset = state.assets.find(a => a.name === name);
    if (asset) {
      return acc + asset.size;
    }
    return acc;
  };

  Object.values(state.entrypoints).forEach(({ assets }) => {
    const jsFiles = assets.filter(
      a => getFileType(a) === FILE_TYPES.JAVASCRIPT,
    );
    const cssFiles = assets.filter(a => getFileType(a) === FILE_TYPES.CSS);

    dashboardState.initialJSSize = jsFiles.reduce(entrypointCallBack, 0);
    dashboardState.initialCSSSize = cssFiles.reduce(entrypointCallBack, 0);
  });

  return dashboardState;
};

const removeSourceFromModule = moduleList => {
  return moduleList.map(m => {
    if (m.source) {
      delete m.source;
    }
    return m;
  });
};

const formateState = state => {
  const newState = state;
  const newFormat = { newline: true, escapeXML: true, colors: true };
  const formatter = new ANSIToHtml(newFormat);

  newState.modules = removeSourceFromModule(newState.modules);
  newState.warnings = newState.warnings.map(w => formatter.toHtml(w));
  newState.errors = newState.errors.map(e => formatter.toHtml(e));
  newState.dashboardState = computeDashboardState(newState);
  newState.packageSize = computePackageSize(newState.modules);

  return newState;
};

module.exports = {
  getPackageJson,
  formateState,
};

// const mod = appData.stateData.modules
// .filter(n => n.name.indexOf('node_modules') !== -1)
// .map(n => {
//   return {
//     name: n.name.split('/')[2],
//     module: n,
//   };
// })
// .reduce((acc, n) => {
//   const { totalSize, modules } = acc[n.name] || {
//     totalSize: 0,
//     modules: [],
//   };

//   const sum = totalSize + n.module.size;
//   return {
//     ...acc,
//     [n.name]: {
//       totalSize: sum,
//       modules: [...modules, n.module],
//     },
//   };
// }, {});

// console.log(mod);

// const { dependencies } = appData.packageJson;

// console.log('dependencies', dependencies);

// const filtedDependancy = Object.keys(dependencies).filter(d => !!mod[d]);

// console.log('filtedDependancy', filtedDependancy);

// const nonListedDeps = Object.keys(mod).filter(
// m => !filtedDependancy.includes(m),
// );

// // console.log('nonListedDeps', nonListedDeps);

// nonListedDeps.forEach(d => {
// const f = mod[d].modules.map(({ issuerName, id }) => {
//   if (!issuerName) {
//     return false;
//   }

//   if (issuerName.indexOf('node_modules') === -1) {
//     return false;
//   }

//   return { id, package: issuerName.split('/')[2] };
// });

// f.forEach(dd => {
//   if (!dd) {
//     return false;
//   }

//   if (mod[dd.package]) {
//     mod[dd.package].modules.push(mod[d].modules.find(m => m.id === dd.id));

//     mod[d].modules = mod[d].modules.filter(m => m.id !== dd.id);
//   }
// });
// // console.log(f);
// });

// Object.keys(mod).forEach(m => {
// if (mod[m].modules.length === 0) {
//   delete mod[m];
// }
// });

// console.log(mod);

// const filtedDependancy1 = Object.keys(dependencies).filter(d => !!mod[d]);

// const nonListedDeps1 = Object.keys(mod).filter(m =>
// !filtedDependancy1.includes(m),
// );

// console.log('nonListedDeps 1', nonListedDeps1);

// nonListedDeps.forEach(d => {
//   const f = mod[d].modules.map(({ issuerName, id }) => {
//     if (!issuerName) {
//       return false;
//     }

//     if (issuerName.indexOf('node_modules') === -1) {
//       return false;
//     }

//     return { id, package: issuerName.split('/')[2] };
//   });

//   f.forEach(dd => {
//     if (!dd) {
//       return false;
//     }

//     if (mod[dd.package]) {
//       mod[dd.package].modules.push(mod[d].modules.find(m => m.id === dd.id));

//       mod[d].modules = mod[d].modules.filter(m => m.id !== dd.id);
//     }
//   });
//   // console.log(f);
// });

// console.log(mod);
