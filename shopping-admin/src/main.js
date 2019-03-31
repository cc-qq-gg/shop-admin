import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@fortawesome/fontawesome-free/css/all.css'
Vue.use(ElementUI)

/**
 * 全局过滤器
 * 本质就是一个函数，全局过滤器可以在全局任何模板中调用
 * value 希望是一个时间戳
 * 参考文档：https://cn.vuejs.org/v2/guide/filters.html
 * 适用于在模板中需要对数据进行格式化输出的时候，而不影响原来的数据
 * 常见的：日期格式化、字母转大写、字母转小写
 * 也支持私有过滤器
 * <h1>{{ 1553746037397 | dateFormat('YYYY-MM-DD') }}</h1>
  <h1>{{ 'hello' | uppercase }}</h1>
  <h1>{{ 'Hello' | lowercase }}</h1>
 */
Vue.filter('dateFormat', function (value, format = 'YYYY-MM-DD HH:mm:ss') {
  // console.log('value => ', value)
  // console.log('format => ', format)
  return dayjs(value).format(format) // if (!value) return ''
  // value = value.toString()
  // return value.charAt(0).toUpperCase()  value.slice(1)
})

Vue.filter('uppercase', function (value) {
  return value.toUpperCase()
})
Vue.filter('lowercase', function (value) {
  return value.toLowerCase()
})
// 防止vue启动时产生生产提示
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
