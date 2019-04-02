import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Layout from './views/Layout.vue'
import Auth from './views/Auth/Auth'
import Right from './views/Right/right'
import Goods from './views/Goods/good'
import GoodsAdd from './views/Goods/goodsAdd'
import GoodCategory from './views/Goods/goodCategory'
import EchartsDemo from '@/views/EchartDemo'
import OrderList from '@/views/Orders'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        { path: '/users', component: Auth },
        { path: '/rights', component: Right },
        { path: '/Goods', component: Goods },
        { path: '/goodAdd', component: GoodsAdd },
        { path: '/categories', component: GoodCategory },
        { path: '/echart', component: EchartsDemo },
        { path: '/orders', component: OrderList },
        {
          path: '/roles',
          component: () => import('./views/Roles/role')
        }
      ]
    }
    // {
    // path: '/about',
    // name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
// 路由token登录验证
router.beforeEach((to, from, next) => {
  const { path } = to
  console.log(path)
  if (path !== '/login') {
    const token = window.localStorage.getItem('token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
