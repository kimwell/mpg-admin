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
  path: '/_home',
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
  }]
}]