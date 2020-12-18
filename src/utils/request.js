import axios from 'axios'
const request = axios.create({ // create 床架一个新的axios对象1.可以简化路径写法2.当基础路径发生变化时方便修改，有利于维护
  baseURL: 'http://ttapi.research.itcast.cn' // 基础路径
})

export default request // export default 默认导出智能导出一次 导入时一次性将对象全部导入了
