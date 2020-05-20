import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _68c1960a = () => interopDefault(import('..\\pages\\intensity.vue' /* webpackChunkName: "pages_intensity" */))
const _2a7bdf4a = () => interopDefault(import('..\\pages\\photometrics.vue' /* webpackChunkName: "pages_photometrics" */))
const _85b4661a = () => interopDefault(import('..\\pages\\sensor.vue' /* webpackChunkName: "pages_sensor" */))
const _6f8476a9 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/intensity",
    component: _68c1960a,
    name: "intensity"
  }, {
    path: "/photometrics",
    component: _2a7bdf4a,
    name: "photometrics"
  }, {
    path: "/sensor",
    component: _85b4661a,
    name: "sensor"
  }, {
    path: "/",
    component: _6f8476a9,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
