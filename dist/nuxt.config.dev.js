"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'title',
      content: 'Camera Calculator'
    }, {
      name: 'description',
      content: 'The online calculator on camera settings and lighting intensity.'
    }, {
      name: 'keywords',
      content: 'calculator, film, camera, lighting, iso, aperture'
    }, {
      name: 'robots',
      content: 'index, follow'
    }, {
      name: 'language',
      content: 'English'
    }, {
      name: 'author',
      content: 'Reinaldy Rafli'
    }, {
      name: 'revisit-after',
      content: '14 days'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }, {
      hid: 'description',
      name: 'description',
      content: process.env.npm_package_description || ''
    }],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#fff'
  },

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
  modules: [// Doc: https://bootstrap-vue.js.org
  'bootstrap-vue/nuxt', // Doc: https://axios.nuxtjs.org/usage
  '@nuxtjs/axios'],

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
    extend: function extend(config, ctx) {}
  }
};
exports["default"] = _default;