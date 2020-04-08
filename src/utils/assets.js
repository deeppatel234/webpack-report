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

const computeAssetsState = state => {
  const assetsState = {
    totalJSSize: {
      size: 0,
      assets: [],
    },
    totalCSSSize: {
      size: 0,
      assets: [],
    },
    totalStaticFileSize: {
      size: 0,
      assets: [],
    },
    totalAssetsSize: {
      size: 0,
      assets: [],
    },
    initialJSSize: {
      size: 0,
      assets: [],
    },
    initialCSSSize: {
      size: 0,
      assets: [],
    },
  };

  state.assets.forEach(({ name, size, chunks }) => {
    if (!isValidName(name)) {
      return true;
    }

    const fileType = getFileType(name);

    if (fileType === FILE_TYPES.JAVASCRIPT) {
      assetsState.totalJSSize.size += size;
      assetsState.totalJSSize.assets.push({ name, size, chunks });
    } else if (fileType === FILE_TYPES.CSS) {
      assetsState.totalCSSSize.size += size;
      assetsState.totalCSSSize.assets.push({ name, size, chunks });
    } else {
      assetsState.totalStaticFileSize.size += size;
      assetsState.totalStaticFileSize.assets.push({ name, size, chunks });
    }

    assetsState.totalAssetsSize.size += size;
    assetsState.totalAssetsSize.assets.push({ name, size, chunks });

    return true;
  });

  const entrypointCallBack = key => (acc, name) => {
    const asset = state.assets.find(a => a.name === name);
    if (asset) {
      assetsState[key].assets.push({
        name: asset.name,
        size: asset.size,
        chunks: asset.chunks,
      });
      return acc + asset.size;
    }
    return acc;
  };

  Object.values(state.entrypoints).forEach(({ assets }) => {
    const jsFiles = assets.filter(
      a => getFileType(a) === FILE_TYPES.JAVASCRIPT,
    );
    const cssFiles = assets.filter(a => getFileType(a) === FILE_TYPES.CSS);

    assetsState.initialJSSize.size = jsFiles.reduce(
      entrypointCallBack('initialJSSize'),
      0,
    );
    assetsState.initialCSSSize.size = cssFiles.reduce(
      entrypointCallBack('initialCSSSize'),
      0,
    );
  });

  return assetsState;
};

const removeUnusedAssetsData = assets => {
  return assets.map(a => {
    return {
      name: a.name,
      size: a.size,
      chunks: a.chunks,
      emitted: a.emitted,
    };
  });
};

module.exports = {
  computeAssetsState,
  removeUnusedAssetsData,
};
