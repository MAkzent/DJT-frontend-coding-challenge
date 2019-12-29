module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    'plugin:vue-a11y/recommended',
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'plugin:jest/recommended',
    'plugin:cypress/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    camelcase: 'off',
    '@typescript-eslint/camelcase': ['error', { properties: 'never' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  overrides: [
    {
      files: ['*.test.{js,ts}'],
      env: {
        jest: true,
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['cypress/**/*.{ts,js}'],
      env: {
        'cypress/globals': true,
      },
      rules: {
        'jest/expect-expect': 'off',
        'jest/valid-expect': 'off',
        'jest/valid-expect-in-promise': 'off',
      },
    },
  ],
}
