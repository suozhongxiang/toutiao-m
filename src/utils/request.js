import axios from 'axios'
import store from '@/store'
const request = axios.create({ // create 创建一个新的axios对象1.可以简化路径写法2.当基础路径发生变化时方便修改，有利于维护
  baseURL: 'http://toutiao-app.itheima.net/' // 基础路径
})
request.interceptors.request.use(function (config) { // 请求拦截器，拦截了每次请求的对象，给上面加一点东西
  const { user } = store.state // 结构赋值出state中的user对象，state是一个大对象
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default request // export default 默认导出智能导出一次 导入时一次性将对象全部导入了
