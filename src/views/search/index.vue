<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#2892ff"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResult = false"
      />
      <!-- 文本框得到焦点时，再次隐藏搜索结果，就算是之前没点击过，那也是保持原样 -->
    </form>
    <!-- 具体展示主要封装组件 -->
    <!-- 组件展示有顺序， -->
    <!-- 第一个判断执行为true后面不执行 -->
    <div class="conent"></div>
      <search-result v-if="isResult" :searchText="searchText"/>
    <!-- 判断是否点击了搜索按钮，代表点击了搜索按钮 -->
    <search-suggestion v-else-if="searchText" :searchText="searchText" @searchT="onSearch"/>
    <!-- 判断文本是否有文字，代表开始输入文字了,因为是响应式的，所以每一次数据更新都会从上到下判断一次 -->
    <search-history v-else :searchHistoryList="searchHistoryList" @searchT="onSearch" @clearHist="searchHistoryList = []"/>
    <!-- 什么也没有代表刚进来，展示搜索历史 -->
  </div>
</template>

<script>
import searchHistory from './components/search-history'
import searchSuggestion from './components/search-suggestion'
import searchResult from './components/search-result'
import { getItem, setItem } from '@/utils/stroage'
export default {
  name: 'SearchIndex',
  components: { // 注册组件
    searchHistory,
    searchSuggestion,
    searchResult
  },
  data () {
    return {
      searchText: '',
      isResult: false,
      searchHistoryList: getItem('serach-histories') || [] // 历史记录数据,从本地存储中拿，逻辑终端判断是都有数据
    }
  },
  methods: {
    // 触发搜索：将变化过的inputval传到子组件，显示子组件，子组件一加载就调用loding方法，开始获取数据，展示
    onSearch (val) { // 联想搜索下方的展示和历史记录都会出发这个函数
      this.searchText = val // 将联想搜索组件串过来的值同步到search搜索框
      const index = this.searchHistoryList.indexOf(this.searchText)
      if (index !== -1) {
        this.searchHistoryList.splice(index, 1)
      }
      this.searchHistoryList.unshift(this.searchText)
      this.isResult = true // 展示搜索结果
    },
    onCancel () {
      this.$router.back()
    }
  },
  watch: {
    searchHistoryList (val) { // 见识历史数据数组变化，以后变化就保存本地，不论是删除还是新增
      setItem('serach-histories', val)
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
 .van-search__action {
   color: #fff;
 }
 .van-search {
   position:fixed;
   width: 100%;
   z-index:99;
 }
 .conent {
   height: 110px;
 }
}
</style>
