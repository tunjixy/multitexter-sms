require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    '@nuxtjs/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
}
