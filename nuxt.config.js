import { execSync } from 'child_process'
import colors from 'vuetify/es5/util/colors'

const shortHash = execSync('git rev-parse --short HEAD').toString()
// const tag = execSync('git describe --tags --abbrev=0').toString().trim()
const tag = 'Undefined'

export default {
  telemetry: false,
  srcDir: 'src/',

  ssr: false,

  target: 'static',

  head: {
    titleTemplate: '%s - jMS Bans',
    title: 'jMS Bans',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'jao Minecraft Server Bans',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: ['~/plugins/banDescriptions'],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/recaptcha'],

  axios: {},

  pwa: {
    manifest: {
      lang: 'ja',
    },
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          maincolor: colors.shades.white,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          background: colors.grey.darken4,
          archiveTitleColor: colors.amber.darken2,
          archiveSubTitleColor: colors.blueGrey.darken3,
        },
        light: {
          maincolor: colors.shades.black,
          background: colors.grey.lighten4,
          archiveTitleColor: colors.amber.darken2,
          archiveSubTitleColor: colors.blueGrey.lighten4,
        },
      },
      options: {
        customProperties: true,
      },
    },
  },

  build: {},

  recaptcha: {
    siteKey: '6Lfx01oaAAAAAEpbNZxACNq6O1S722415hpcDDF8',
    version: 3,
    hideBadge: true,
  },

  env: {
    ShortHash: shortHash,
    Tag: tag,
  },
}
