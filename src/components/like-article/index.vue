<template>
  <div>
    <van-icon
    :color="value === 1 ? 'red' :  '' "
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    size="25"
    @click="channgeLike"
    />
  </div>
</template>

<script>
import { likeArticle, UnlikeArticle } from '@/api/article'
export default {
  name: 'likeArticle',
  props: ['arteId', 'value'],
  methods: {
    async channgeLike () {
      try {
        let status = 1 // 用来区别现在是什么状态，好提示信息和发送后端
        if (this.value === 1) { // 取消
          await UnlikeArticle(this.arteId)
          status = -1
        } else {
          await likeArticle(this.arteId)
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消成功')
      } catch (error) {
        this.$toast('操作失败')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
