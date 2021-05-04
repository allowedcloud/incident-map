import awsconfig from './src/aws-exports.js'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'server',
  head: {
    title: 'incident-map',
    htmlAttrs: {lang: 'en'},
    meta:
        [
          {charset : 'utf-8'},
          {name : 'viewport', content : 'width=device-width, initial-scale=1'},
          {hid : 'description', name : 'description', content : ''}
        ],
    link: [ {rel : 'icon', type : 'image/x-icon', href : '/favicon.ico'} ]
  },

  env: {
    mapboxToken: process.env.MAPBOX_TOKEN,
    formURL: process.env.FORMSPREE_URL
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins:
      [
        // { src: '~/plugins/mapbox', mode: 'client' }
        { src: '~/plugins/tippy.js'}
      ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended):
  // https://go.nuxtjs.dev/config-modules
  buildModules:
      [
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        '@braid/vue-formulate/nuxt'
      ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules:
      [
        '@nuxtjs/axios', '~/modules/vh-authhelper/index.js',
        [ '~/modules/amplify/index.js', awsconfig ]
      ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
