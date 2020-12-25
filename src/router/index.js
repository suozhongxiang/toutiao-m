import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: '/layout' },
  { path: '/layout', name: 'layout', component: () => import('@/views/layout'), children: [{ path: '', redirect: '/home' }, { path: '/home', name: 'home', component: () => import('@/views/home') }, { path: '/wen', name: 'wen', component: () => import('@/views/wen') }, { path: '/video', name: 'video', component: () => import('@/views/video') }, { path: '/my', name: 'my', component: () => import('@/views/my') }] },
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  { path: '/search', name: 'search', component: () => import('@/views/search') },
  //  props: true，开启动态路由模式，
  // 还可以在路由地址后面直接跟上:articleId的方式，跳转到的路由组件可以接受，不开启props模式，只能$route.params.articleId接受，开启了之后，被跳转的路由组件用props接受
  { path: '/article/:articleId', name: 'article', component: () => import('@/views/article'), props: true },
  { path: '/Profile', name: 'userProfile', component: () => import('@/views/user-profile') }
] // 使用路由懒加载的形式自动加载index.vue
const router = new VueRouter({
  routes
})
export default router
