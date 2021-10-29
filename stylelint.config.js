module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    'at-rule-no-unknown': null,
    'font-family-no-missing-generic-family-keyword': [
      true,
      {
        ignoreFontFamilies: ['Material Design Icons'],
      },
    ],
  },
  customSyntax: 'postcss-html',
}
