const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg').concat(['glb', 'gltf', 'png', 'jpg']), // Add additional asset extensions
    sourceExts: [...resolver.sourceExts, 'svg', 'ts', 'tsx', 'js', 'jsx', 'json', 'cjs', 'mjs'], // Add additional source extensions
  };

  return config;
})();
