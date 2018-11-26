import Main from '../views/layout/layoutTmp/Vlayout.vue';

export default [{
  path: '/login',
  name: 'login',
  component: resolve => require(['@/views/login/index.vue'], resolve),
  meta: {
    title: '登录',
    hideInMenu: true
  }
}, {
  path: '/',
  name: '_home',
  redirect: '/home',
  component: Main,
  meta: {
    hideInMenu: true
  },
  children: [{
    path: '/home',
    name: 'home',
    component: resolve => require(['@/views/index/index.vue'], resolve),
    meta: {
      title: '首页',
      hideInMenu: true
    }
  },{
    path: '/adManage',
    name: 'adManage',
    component: resolve => require(['@/views/adManage/index.vue'], resolve),
    meta: {
      title: '广告管理',
      hideInMenu: true
    }
  },{
    path: '/system',
    name: 'system',
    component: resolve => require(['@/views/system/index.vue'], resolve),
    meta: {
      title: '系统设置',
    }
  },{
    path: '/member',
    name: 'member',
    component: resolve => require(['@/views/member/index.vue'], resolve),
    meta: {
      title: '会员管理',
    }
  },{
    path: '/shop',
    name: 'shop',
    component: resolve => require(['@/views/shop/index.vue'], resolve),
    meta: {
      title: '门店管理',
    }
  },{
    path: '/exchange',
    name: 'exchange',
    component: resolve => require(['@/views/exchange/index.vue'], resolve),
    meta: {
      title: '积分兑换网费',
    }
  },{
    path: '/record',
    name: 'record',
    component: resolve => require(['@/views/record/index.vue'], resolve),
    meta: {
      title: '积分兑换记录',
    }
  }]
}]