import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: '/layout' },
  { path: '/layout', name: 'layout', component: () => import('@/views/layout'), children: [{ path: '', redirect: '/home' }, { path: '/home', name: 'home', component: () => import('@/views/home') }, { path: '/wen', name: 'wen', component: () => import('@/views/wen') }, { path: '/video', name: 'video', component: () => import('@/views/video') }, { path: '/my', name: 'my', component: () => import('@/views/my') }] },
  { path: '/login', name: 'login', component: () => import('@/views/login') }
] // 使用路由懒加载的形式自动加载index.vue
const router = new VueRouter({
  routes
})
export default router
