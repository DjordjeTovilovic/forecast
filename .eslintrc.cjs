module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'jest', 'prettier'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'import/no-dynamic-require': 0,
    'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
    'import/no-unresolved': 0,
    'global-require': 0,
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'no-await-in-loop': 0,
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
    'no-return-await': 0,
    'no-console': 0,
    'no-use-before-define': 0,
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2,
        endOfLine: 'lf',
        arrowParens: 'always',
        bracketSpacing: true,
      },
    ],
  },
}
