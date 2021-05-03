export default {
  ssr: false,
  target: 'static',
  head: {
    title: 'Camera Calculator – Free Calculator for Film Camera Department',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: 'favicon-192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: 'favicon-32.png',
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        sizes: '180x180',
        href: 'favicon-180.png',
      },
    ],
  },

  publicRuntimeConfig: {
    baseUrl: 'https://cameracalc.reinaldyrafli.com',
    author: 'Reinaldy Rafli',
    title: 'Camera Calculator – Free Calculator for Film Camera Department',
    description: 'Calculate things like photometrics, focal length equivalent, and more..',
    language: 'English',
    socialIcon: 'head-icon.png',
  },

  components: true,

  loading: { color: '#fff' },

  css: [],

  plugins: [],

  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  tailwindcss: {
    jit: true,
    viewer: false,
  },
  colorMode: {
    classSuffix: '',
  },

  modules: [
    'nuxt-webfontloader',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-gtag',
  ],
  webfontloader: {
    google: {
      families: ['Inter:300,400,700'],
    },
  },
  sitemap: {
    hostname: 'https://cameracalc.reinaldyrafli.com',
    gzip: true,
    exclude: [
      '/_nuxt/**',
    ],
  },
  'google-gtag': {
    id: process.env.GTAG_ID || '',
    config: {
      anonymize_ip: true,
      send_page_view: false,

    },
  },
};
