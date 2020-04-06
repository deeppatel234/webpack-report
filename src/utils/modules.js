const _keyBy = require('lodash/keyBy');

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

const removeSourceFromModule = moduleList => {
  return moduleList.map(m => {
    if (m.source) {
      delete m.source;
    }
    return m;
  });
};

const extractSubModules = moduleList => {
  return moduleList.reduce((acc, moduleItem) => {
    if (moduleItem.modules) {
      return [...acc, ...moduleItem.modules];
    }
    return [...acc, moduleItem];
  }, []);
};

const convertModulesByKey = modules => _keyBy(modules, 'id');

const computeModuleState = state => {
  const packageJsonModules = Object.keys(state.packageSize).reduce(
    (acc, key) => {
      return acc + state.packageSize[key].modules.length;
    },
    0,
  );

  const moduleState = {
    totalModules: state.modules.length,
    totalPackagesModule: packageJsonModules,
    totalPackages: Object.keys(state.packageSize).length,
  };

  return moduleState;
};

module.exports = {
  computePackageSize,
  extractSubModules,
  removeSourceFromModule,
  computeModuleState,
  convertModulesByKey,
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
