import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _16060567 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages_about" */))
const _3954860d = () => interopDefault(import('..\\pages\\intensity.vue' /* webpackChunkName: "pages_intensity" */))
const _25c44c67 = () => interopDefault(import('..\\pages\\photometrics.vue' /* webpackChunkName: "pages_photometrics" */))
const _83ccd860 = () => interopDefault(import('..\\pages\\sensor.vue' /* webpackChunkName: "pages_sensor" */))
const _35bde02c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    path: "/about",
    component: _16060567,
    name: "about"
  }, {
    path: "/intensity",
    component: _3954860d,
    name: "intensity"
  }, {
    path: "/photometrics",
    component: _25c44c67,
    name: "photometrics"
  }, {
    path: "/sensor",
    component: _83ccd860,
    name: "sensor"
  }, {
    path: "/",
    component: _35bde02c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
