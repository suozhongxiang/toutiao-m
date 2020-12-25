<template>
  <!-- 展示评论数据组件 -->
  <div>
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    @load="onLoad"
  >
  <!-- 将每一个评论的对象都传给子组件，子组件拿到后进行展示，可以对其进行回复和点赞 -->
  <comments-items v-for="(item, index) in list" :key="index" :commentsData="item" @replyShow="$emit('replyShow',$event)"/>
  <!-- replyShow为子组件的事件传值，继续再传值 -->
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/article'
import CommentsItems from './comment-items'
export default {
  name: 'commentList',
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20,
      error: false
    }
  },
  props: ['arteId', 'list', 'type'], // type 是父组件调用子组件时传的，不传默认为a，代表获取文章评论
  // props:{
  //   type: {
  //     type: String,
  //     vertical (value) { // 用这个函数对props传值的内容作出限制
  //       return ['a', 'c'].includes(value) // 表示只能传这两个值
  //     }
  //   }
  // },
  components: {
    CommentsItems
  },
  methods: {
    async onLoad () { // 加载文章id
      try {
        const params = {
          type: this.type || 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.arteId.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量,根据这个每次获取不同的评论
          limit: this.limit // 获取的评论数据个数
        }
        const { data } = await getComments(params)
        const { results } = data.data
        this.$emit('onloadSuccess', data.data)
        this.list.push(...results)
        if (results.length === 0) { // 返回的数据为0结束，否则继续
          this.finished = true
        } else {
          this.offset = data.data.last_id
        }
        // if (Math.random() > 0.5) {
        //   JSON.parse('dasdsada')
        // }
      } catch (error) {
        this.error = true
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
