export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => lazyLoadView(import('@pages/home/home')),
    // redirect: '/home/overview',
    children: [
      // 店铺详情
      {
        path: 'shop-detail',
        name: 'shop-detail-outer',
        component: () => lazyLoadView(import('@pages/shop-detail/shop-detail'))
      },
      // 选择店铺
      {
        path: 'shop-select',
        name: 'shop-select',
        component: () => lazyLoadView(import('@pages/shop-select/shop-select'))
      },
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
          // 店铺详情
          {
            path: 'shop-detail',
            name: 'shop-detail',
            component: () => lazyLoadView(import('@pages/shop-detail/shop-detail'))
          },
          // 发送邀请
          {
            path: 'invitation',
            name: 'invitation',
            component: () => lazyLoadView(import('@pages/invitation/invitation'))
          }
        ]
      },
      // 能力模型图
      {
        path: 'capacity-model',
        component: () => lazyLoadView(import('@pages/capacity-model/capacity-model')),
        children: [
          {
            // 店铺小程序二维码
            path: 'business-card',
            component: () => lazyLoadView(import('@pages/business-card/business-card'))
          }
        ]
      }
    ]
  },
  // 登陆
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
    timeout: 100000
  })

  return Promise.resolve({
    functional: true,
    render(h, {data, children}) {
      // 将属性和方法传递给所有展示组件
      return h(AsyncHandler, data, children)
    }
  })
}
