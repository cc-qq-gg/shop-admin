import axios from 'axios'
import router from '@/router'
import { getToken } from './token.js'
// 配置路由
// 好处就是我们可以针对不同 url 的接口创建多个 axios 实例
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})
/**
 * axios 请求拦截器
 * 我们可以在这里定制一些业务逻辑，例如统一给需要授权的 API 加 token
 */
// Add a request interceptor
http.interceptors.request.use(function (config) {
  if (config.url !== '/login') {
    // 非登录页按要求要获取Authorization验证
    // console.log(config)
    config.headers.Authorization = getToken()
  } // Do something before request is sent
  return config // 请求通过的规则，如果不 return config，则请求不会发出去
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
/**
 * axios 响应拦截器
 */
http.interceptors.response.use(function (response) {
  // Do something with response data
  // 验证token是否合法的状态码
  if (response.data.meta.status === 401) {
    // 跳转到登录页
    // 组件的 this.$router 就是 router/index.js 中 new VueRouter 实例
    router.replace('/login')
  }
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})
export default http
