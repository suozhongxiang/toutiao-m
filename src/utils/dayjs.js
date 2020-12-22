import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime' // 加载dayjs中处理相对时间插件
dayjs.locale('zh-cn') // 配置简体中文

// var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime) // 挂载

// dayjs().from(dayjs('1990')) // 2 年以前
// dayjs().from(dayjs(), true) // 2 年

// dayjs().fromNow()

// dayjs().to(dayjs())

// dayjs().toNow()
Vue.filter('relativeTime', date => { // 注册一个全局的过滤器，在任何组件内都可以使用这个，因为每个模板都是Vue的实例，会根据原型查找到过滤器
  return dayjs().to(dayjs(date)) // 返回的是现在的时间到传入的date的时间
})
