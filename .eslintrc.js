module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'curly': 'off',
        'prettier/prettier': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'react-native/no-inline-styles': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
