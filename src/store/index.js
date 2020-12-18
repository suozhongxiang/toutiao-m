import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/stroage'
Vue.use(Vuex)
const tokenkey = 'token_key'
export default new Vuex.Store({
  state: {
    user: getItem(tokenkey) // 从本地获取token
  },
  mutations: {
    setUser (state, data) { // 保存最新的token
      state.user = data
      setItem(data) // tonken和vuex相结合
    }
  },
  actions: {
  },
  modules: {
  }
})
