/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  resolver: {
    blockList: [
      // Ignore local `.sample.js` files.
			/.*\.sample\.js$/,
			// Ignore IntelliJ directories
			/.*\.idea\/.*/,
			// ignore git directories
			/.*\.git\/.*/,
			// Ignore android directories
			/.*\/app\/build\/.*/
    ]
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
