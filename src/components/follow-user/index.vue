<template>
  <div>
    <van-button v-if="followedBel"  round  @click="onfllow" type="default" :loading="fllowShow">已关注</van-button>
    <van-button v-else round color="#3296fa" icon="plus" @click="onfllow" :loading="fllowShow">关注</van-button>
  </div>
</template>

<script>
import { addUser, cnelUser } from '@/api/article'
export default {
  name: 'followUser',
  model: {
    prop: 'followedBel',
    event: 'updataFollowed'
  },
  data () {
    return {
      fllowShow: false
    }
  },
  props: {
    // value: { // 控制关注和已关注 // 默认不修改model的话，职能接受数据用value接收，绑定触发父亲的自定义事件智能使用input
    //   type: Boolean,
    //   required: true
    // },
    followedBel: { // 控制关注和已关注
      type: Boolean,
      required: true
    },
    articleId: { // 关注和取消关注的作者ID
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onfllow () { // 点击关注或者取消关注
      this.fllowShow = true // 打开loding显示
      try {
        if (this.followedBel) { // 判断当前的关注状态
          await cnelUser(this.articleId)
        } else {
          await addUser(this.articleId)
        }
        // this.followedBel = !this.followedBel // 取反
        this.$emit('updataFollowed', !this.followedBel) // 触发父组件的自定义事件，修改父组件中传过来控制的数据
        this.$toast.success(!this.followedBel ? '关注成功' : '取消关注成功')
      } catch (error) {
        if (error.response && error.response.status === 400) return this.$toast('不能关注自己')
        this.$toast('操作失败')
      }
      this.fllowShow = false // 不管接口是报错还是正常都要关闭
    }
  }
}
</script>

<style lang="less" scoped>
</style>
