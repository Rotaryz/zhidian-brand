import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import NProgress from 'nprogress/nprogress'
import routes from './routes'
import storage from 'storage-controller'

NProgress.configure({showSpinner: false})

Vue.use(VueRouter)
Vue.use(VueMeta, {
  keyName: 'page'
})

const router = new VueRouter({
  routes,
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

const OAUTH_ROUTE = '/login' // 授权页面

router.beforeEach((routeTo, routeFrom, next) => {
  if (routeFrom.name !== null) {
    NProgress.start()
  }
  // 登陆
  if (routeTo.path !== '/login') {
    const hasToken = storage.has('token')
    !hasToken && next({path: OAUTH_ROUTE, replace: true})
  }
  return next()
})

router.beforeResolve(async (routeTo, routeFrom, next) => {
  try {
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            if (args.length) {
              if (routeFrom.name === args[0].name) {
                NProgress.done()
              }
              next(...args)
              reject(new Error('Redirected'))
            } else {
              resolve()
            }
          })
        } else {
          resolve()
        }
      })
    }
  } catch (error) {
    return
  }
  next()
})

router.afterEach((routeTo, routeFrom) => {
  NProgress.done()
})

export default router
