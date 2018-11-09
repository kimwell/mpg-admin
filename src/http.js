import {
  Modal,
  Notice,
  LoadingBar
} from 'iview'
import axios from 'axios'
import Qs from 'qs'
import store from './store/store'
import * as types from './store/types'
import router from './router/index'


// axios 配置
// axios.defaults.timeout = 20000;
if (process.env.NODE_ENV == 'development')
  axios.defaults.baseURL = 'http://192.168.0.252:8082';
  // axios.defaults.baseURL = 'http://192.168.0.40:8080'; //胡
  // axios.defaults.baseURL = 'http://192.168.0.154:8080'; //陈
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
axios.defaults.withCredentials = true;

// 获取用户token
let authorization = store.state.authorization;

// http request 拦截器
axios.interceptors.request.use(config => {
  LoadingBar.start();
  if (store.state.authorization || store.state.authorization != null) {
    config.headers.common['authorization'] = store.state.authorization;
  }
  config.data = Qs.stringify(config.data);
  return config;
}, err => {
  return Promise.reject(err);
});

// http response 拦截器
axios.interceptors.response.use(response => {
  LoadingBar.finish();
  if (response.data.code === 403) {
    // if (router.currentRoute.name != 'home') {
      Modal.confirm({
        content: response.data.message,
        onOk() {
          //清除token信息并跳转到登录页面
          store.commit(types.LOGOUT);
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        },
        onCancel() {
          router.replace({
            path: '/'
          })
        }
      })
    // }
  } else if (response.data.code === 401) {
    Modal.confirm({
        content: response.data.message,
        onOk() {
            router.replace({
                path: '/home'
            })
        },
        onCancel() {
          router.replace({
            path: '/home'
          })
        }
    })
  }
  return response.data;
}, error => {
  LoadingBar.error();
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '参数格式错误'
        break

      case 401:
        error.message = '未授权，请登录'
        break

      case 403:
        error.message = '拒绝访问'
        break

      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`
        break

      case 408:
        error.message = '请求超时'
        break

      case 500:
        error.message = '服务器内部错误'
        break

      case 501:
        error.message = '服务未实现'
        break

      case 502:
        error.message = '网关错误'
        break

      case 503:
        error.message = '服务不可用'
        break

      case 504:
        error.message = '网关超时'
        break

      case 505:
        error.message = 'HTTP版本不受支持'
        break
      default:
        error.message = '服务器线路异常'
    }
  }
  // Notice.error({
  //     title: error.message,
  //     desc: '网络或服务器正消极罢工，请刷新重试或联系客服人员报备解决，谢谢！'
  // })
  return Promise.reject(error)
});

export default axios;