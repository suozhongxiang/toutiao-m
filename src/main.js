import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.less'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible' // 配置rem的基准，也就是font-size媒体查询响应式
import './utils/dayjs' // 执行dayjs时间格式化的代码,等于在Vue实例上挂载一个时间过滤器
import './style/github-markdown.css' // 加载文章正文的样式css
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
