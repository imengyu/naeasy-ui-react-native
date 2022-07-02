module.exports = {
  root: true,
  extends: '@react-native-community',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
        'no-var': 'error',
        'react-native/no-inline-styles': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'prettier/prettier': 'off',
      },
    },
  ],
};
