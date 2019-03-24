import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Layout from './views/Layout.vue'
import About from './views/About'
import Auth from './views/Auth/Auth'
import Role from './views/Auth/Role'

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
        { path: '/ab', component: About },
        { path: '/auth', component: Auth },
        { path: '/role', component: Role }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
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
