<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { rearchResult } from '@/api/search'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false // 错误提示
    }
  },
  props: {
    searchText: { // 接受父组件传过来search搜索框的值
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      try {
        const dataa = {
          page: this.page,
          per_page: 20,
          q: this.searchText
        }
        const { data } = await rearchResult(dataa)
        this.list.push(...data.data.results) // !!!!!!!!!!!将每一次请求的数据都保存到数组里，有缓存，一直向下滑动就会一直往里添加
        this.loading = false // 关闭显示
        if (data.data.results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast('获取搜索结果数据失败')
      }
    }
  }
}
</script>
