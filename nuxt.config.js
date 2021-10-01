import { execSync } from 'child_process'
import colors from 'vuetify/es5/util/colors'

const shortHash = execSync('git rev-parse --short HEAD').toString()
const tag = execSync('git describe --tags --abbrev=0').toString().trim()

export default {
  telemetry: false,
  srcDir: 'src/',

  ssr: false,

  target: 'static',

  head: {
    titleTemplate: '%s - jMS Bans',
    title: 'jMS Bans',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'msapplication-TileColor',
        content: '#ffb41d',
      } /*
      {
        name: 'msapplication-config',
        content: '/favicons/browserconfig.xml',
      }, */,
      {
        name: 'theme-color',
        content: '#ffb41d',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'jao Minecraft Server Bans',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'jMS Bans',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'article',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://bans.jaoafa.com',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'jMS Bans',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'jao Minecraft Server Bans',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@jaoafa',
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
