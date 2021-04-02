export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: true,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'to-do-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },


  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // 'bootstrap/dist/css/bootstrap.min.css',
    // 'element-ui/lib/theme-chalk/index.css'
    '@assets/css/index.css',
    // "@assets/scss/index.scss",
    "~/assets/scss/index.scss"
  ],

  // styleResources: {
  //   scss: ["./assets/scss/*.scss"]
  // },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/plugins',
    '@/plugins/element-ui',
    { src: '@/plugins/ymapPlugin.js',  mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    "@nuxtjs/style-resources"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {

  }
}
