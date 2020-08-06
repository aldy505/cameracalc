export default {
  mode: "universal",
  target: "static",
  /*
   ** Headers of the page
   */
  head: {
    title: "Camera Calculator – Free Calculator for Film Camera Department",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Calculate things like photometrics, focal length equivalent, and more..",
      },
      {
        hid: "title",
        name: "title",
        content:
          "Camera Calculator – Free Calculator for Film Camera Department",
      },
      {
        hid: "keywords",
        name: "keywords",
        content: "camera, department, film, production, calculator, free",
      },
      { hid: "author", name: "author", content: "Reinaldy Rafli" },
      { name: "robots", content: "index, follow" },
      { name: "revisit-after", content: "5 days" },
      { name: "language", content: "English" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "" },
      {
        property: "og:title",
        content:
          "Camera Calculator – Free Calculator for Film Camera Department",
      },
      {
        property: "og:description",
        content:
          "Calculate things like photometrics, focal length equivalent, and more..",
      },
      { property: "og:image", content: "head-icon.png" },
      { property: "twitter:card", content: "summary_large_image" },
      { property: "twitter:url", content: "" },
      {
        property: "twitter:title",
        content:
          "Camera Calculator – Free Calculator for Film Camera Department",
      },
      {
        property: "twitter:description",
        content:
          "Calculate things like photometrics, focal length equivalent, and more..",
      },
      { property: "twitter:image", content: "head-icon.png" },
    ],
    link: [
      //{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "favicon-192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "favicon-32.png",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "180x180",
        href: "favicon-180.png",
      },
    ],
    script: [],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev, isClient }) {
      config.node = { fs: "empty" }
    },
  },
  generate: {},
}
