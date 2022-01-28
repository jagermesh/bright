module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    commonjs: true,
  },
  extends: [
    'eslint:recommended',
  ],
  globals: {
    br: 'readonly',
    $: 'readonly',
    jQuery: 'readonly',
    Handlebars: 'readonly',
  },
  parserOptions: {
    ecmaVersion: '2020',
    sourceType: 'module',
  },
  ignorePatterns: [
    'dist/**/*.js',
    'vendor/**/*.js',
    '3rdparty/**/*.js',
  ],
  rules: {
    indent: ['error', 2],
  },
};
