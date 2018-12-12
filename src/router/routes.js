export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => lazyLoadView(import('@pages/home/home')),
    children: [
      // 账号信息
      {
        path: 'user-info',
        name: 'user-info',
        component: () => lazyLoadView(import('@pages/user-info/user-info'))
      },
      // 店铺管理列表
      {
        path: 'shop-list',
        name: 'shop-list',
        component: () => lazyLoadView(import('@pages/shop-list/shop-list')),
        children: [
          {
            path: 'shop-detail',
            name: 'shop-detail',
            component: () => lazyLoadView(import('@pages/shop-detail/shop-detail')),
          }
        ]
      },
      // 店铺详情
      {
        path: 'shop-detail',
        name: 'shop-detail',
        component: () => lazyLoadView(import('@pages/shop-detail/shop-detail')),
      },
      {
        path: 'sample',
        meta: {},
        component: () => lazyLoadView(import('@pages/sample/sample'))
      },
      {
        path: 'other-pages',
        meta: {
          defaultRouter: true
        },
        component: () => lazyLoadView(import('@pages/other-pages/other-pages'))
      },
      // 测试页面配置
      {
        path: 'test-page1',
        meta: {
          defaultRouter: true
        },
        component: () => lazyLoadView(import('@pages/test-page1/test-page1'))
      },
      // 测试页面注释
      {
        path: 'test-page',
        meta: {
          defaultRouter: true
        },
        component: () => lazyLoadView(import('@pages/test-page/test-page'))
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => lazyLoadView(import('@pages/login/login')),
    props: true
  },
  {
    path: '/404',
    name: '404',
    component: require('@pages/_404/_404').default,
    props: true
  },
  {
    path: '*',
    redirect: '404'
  }
]

function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    loading: require('@pages/_loading/_loading').default,
    delay: 400,
    error: require('@pages/_timeout/_timeout').default,
    timeout: 10000
  })

  return Promise.resolve({
    functional: true,
    render(h, {data, children}) {
      // 将属性和方法传递给所有展示组件
      return h(AsyncHandler, data, children)
    }
  })
}
