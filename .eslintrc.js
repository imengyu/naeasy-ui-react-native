module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'react-native/no-inline-styles': 'off',
        'prettier/prettier': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
