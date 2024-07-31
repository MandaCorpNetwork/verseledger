module.exports = {
  root: true,
  env: { es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['prettier'],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_[^_].*$|^_$',
        varsIgnorePattern: '^_[^_].*$|^_$',
        caughtErrorsIgnorePattern: '^_[^_].*$|^_$',
      },
    ],
  },
  ignorePatterns: ['build', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
};
