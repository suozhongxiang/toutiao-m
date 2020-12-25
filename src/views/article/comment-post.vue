<template>
  <div class="post">
    <div class="left">
      <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      :placeholder="cutObj ? `回复${cutObj.aut_name}：`: '请发布留言'"
      show-word-limit
    />
    </div>
    <div class="right" @click="post">
      发布
    </div>
  </div>
</template>

<script>
import { addcomments } from '@/api/comment'
export default {
  data () {
    return {
      message: ''
    }
  },
  props: ['Id', 'artID', 'cutObj'],
  methods: {
    async post () { // 添加评论
      if (this.message.length === 0) return this.$toast('不能发布为空')
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const dataa = {
          target: this.Id, // 评论文章的话就是文章给你对象id，评论评论的话就是评论的id
          content: this.message,
          art_id: this.artID || null // 发布文章的评论不需要这个（在文章评论里面使用该组件也没有传值）
        }
        const { data } = await addcomments(dataa)
        this.message = '' // 清空评论
        if (this.cutObj) {
          data.data.new_obj.content = `${data.data.new_obj.content}//@:${this.cutObj.aut_name}`
        }
        this.$emit('postSuccess', data.data)
        this.$toast.success('发布成功')
      } catch (error) {
        this.$toast('发布评论失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.post {
  display: flex;
  padding: 40px;
  padding-right:0 ;
  .van-cell {
    padding: 40px;
    background-color: #f5f7f9;
  }
  /deep/.van-field__control {
    height: 200px!important;
    width: 500px!important;
  }
}
.right {
  color: #3296fa;
  font-size: 35px;
  width: 100%;
  text-align: center;
  line-height: 300px;
}
</style>
