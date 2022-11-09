module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.js',
          '.ios.js',
          '.android.js',
          '.ts',
          '.ios.ts',
          '.android.ts',
          '.jsx',
          '.ios.jsx',
          '.android.jsx',
          '.tsx',
          '.ios.tsx',
          '.android.tsx',
        ],
        alias: {
          '@': './src',
          '@imengyu-ui-lib-debug': './lib/src',
          'imengyu-ui-lib-debug': './lib/src',
        },
      },
    ],
  ],
};
