const _keyBy = require("lodash/keyBy");

const computePackageSize = (moduleList) => {
  const nodeModules = moduleList
    .filter((n) => n.name.startsWith("./node_modules"))
    .map((n) => {
      return {
        name: n.name.split("/")[2],
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

const extractAndRemoveUnusedModules = (moduleList) => {
  return moduleList.reduce((acc, moduleItem) => {
    if (!moduleItem.chunks || !moduleItem.chunks.length) {
      return acc;
    }
    if (moduleItem.modules) {
      const mods = moduleItem.modules.map((m) => ({
        ...m,
        chunks: moduleItem.chunks,
      }));
      return [...acc, ...mods];
    }
    return [...acc, moduleItem];
  }, []);
};

const convertModulesByKey = (modules) => _keyBy(modules, "id");

const computeModuleState = (state) => {
  const packageJsonModules = Object.keys(state.packageSize).reduce(
    (acc, key) => {
      return acc + state.packageSize[key].modules.length;
    },
    0,
  );

  const duplicateModules = state.modules.filter(
    (m) => m.chunks && m.chunks.length > 1,
  );

  const moduleState = {
    duplicateModules: duplicateModules.length,
    totalModules: state.modules.length,
    totalPackagesModule: packageJsonModules,
    totalPackages: Object.keys(state.packageSize).length,
  };

  return moduleState;
};

const removeUnusedModuleData = (modules) => {
  return modules.map((m) => {
    return {
      id: m.id,
      name: m.name,
      size: m.size,
      chunks: m.chunks,
      issuer: m.issuer,
      issuerId: m.issuerId,
      issuerName: m.issuerName,
      reasons: m.reasons,
      built: m.built,
      cacheable: m.cacheable,
      prefetched: m.prefetched,
    };
  });
};

const removeUnusedChunkData = (chunks) => {
  return chunks.map((c) => {
    return {
      id: c.id,
      initial: c.initial,
      entry: c.entry,
      size: c.size,
      names: c.names,
      files: c.files,
      hash: c.hash,
      children: c.children,
      parents: c.parents,
      siblings: c.siblings,
      origins: c.origins,
      modules: removeUnusedModuleData(extractAndRemoveUnusedModules(c.modules)),
    };
  });
};

module.exports = {
  computePackageSize,
  extractAndRemoveUnusedModules,
  computeModuleState,
  convertModulesByKey,
  removeUnusedModuleData,
  removeUnusedChunkData,
};
