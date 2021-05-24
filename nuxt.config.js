export default {
  // server: {
  //   port: 8000 // default: 3000
  // },
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  mode: "universal",
  ssr: true,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title:
      "Maidon - сайт недвижимости Таджикистана | Продажа, аренда квартир и другой недвижимости",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "index, follow" },
      {
        name: "description",
        content:
          "Maidon - сайт недвижисоти об аренде и продаже недвижимости в Таджикистане. Описание объектов, фото, контакты продавца."
      },
      {
        name: "keywords",
        content:
          "майдон, maidon, недвижимость, аренда, продажа, купить, снять, квартиры, дома, новостройки в Таджикистане, купить недвижимость в Таджикистане"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // 'bootstrap/dist/css/bootstrap.min.css',
    // 'element-ui/lib/theme-chalk/index.css'
    "@assets/css/index.css",
    // "@assets/scss/index.scss",
    "~/assets/scss/index.scss"
  ],

  // styleResources: {
  //   scss: ["./assets/scss/*.scss"]
  // },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "@/plugins/plugins", ssr: false },
    "@/plugins/element-ui",
    { src: "@/plugins/ymapPlugin.js", mode: "client" }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: {
    dirs: ["~/components", "~/components/offer"]
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["@nuxtjs/style-resources", "@nuxtjs/google-analytics"],

  googleAnalytics: {
    id: "UA-196575354-1"
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "nuxt-i18n",
    "@nuxtjs/axios"
  ],
  i18n: {
    locales: [
      {
        code: "ru",
        file: "ru.js"
      }
    ],
    lazy: true,
    langDir: "lang/",
    defaultLocale: "ru"
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
