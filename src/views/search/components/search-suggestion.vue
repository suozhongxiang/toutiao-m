<template>
  <div class="search-su">
    <van-cell v-for="(i, index) in suggestions" :key="index" icon="search" @click="searchTexts(i)">
      <div slot="title" v-html="showText(i)"></div>
    </van-cell>
  </div>
</template>

<script>
import { suggestion } from '@/api/search.js'
import { debounce } from 'lodash' // lodash插件，防抖
export default {
  data () {
    return {
      suggestions: [], // 请求数据
      time: null
    }
  },
  props: {
    searchText: { // 接受父组件传过来的数据，只要有变化他就会传值，传值我就过侦听器监视，然后发送请求
      type: String,
      required: true
    }
  },
  watch: {
    searchText: { // 侦听器库写成一个函数，也可以写成一个对象，对其进行配置
      // 监视的处理函数
      handler: debounce(function (val) { // 防抖函数，在规定时间内多次触发函数，每次都是一新的函数
        this.loadSearchSuggestion(val)
      }, 200),
      // handler: this.doi(function (val) { // 防抖函数，在规定时间内多次触发函数，每次都是一新的函数
      //   this.loadSearchSuggestion(val)
      // }, 200),
      // 首次监视触发
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestion (val) { // 获取联想数据
      try {
        const { data } = await suggestion(val)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('获取联想数据失败')
      }
    },
    doi (fn, timer) { // 手写防抖
      if (this.time) clearTimeout(this.time)
      this.time = setTimeout(() => {
        fn()
      }, timer)
    },
    showText (data) { // 只用正则匹配的方法，将每一行返回的结构进行替换，正则找到手动输入的文本，将其加上标签,返回出去，在便标签上一接受，再做到实时展示
      const reg = new RegExp(this.searchText, 'gi') // 创建正则表达式，匹配规则为手动输入的文本
      return data.replace(reg, `<span style="color: #73aff2;">${this.searchText}</span>`) // 让手动输的文本在显示结果中替换为高亮标签
    },
    searchTexts (val) { // 点击模糊搜索项目，触发搜索
      this.$emit('searchT', val) // 将当前点击的项目传递到父组件，同步显示到serach搜索框上，并且触发搜索功能
    }
  },
  computed: {
    suggestionss (val) { // 让首字母高亮
      const aa = []
      this.suggestions.forEach(item => {
        item = `<span style="color: #73aff2;">${item.charAt(0)}</span>${item.slice(1)}`
        aa.push(item)
      })
      return aa
    }
  }
}
</script>

<style lang="less" scoped>
</style>
