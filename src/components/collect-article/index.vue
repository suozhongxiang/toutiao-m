<template>
  <div>
    <van-icon v-if="collected" name="star" size="25" loading class="yellow" @click="channgeCollected"/>
    <!-- <van-icon v-else class="iconfont iconshoucang grd " @click="channgeCollected"/> -->
    <van-icon v-else name="star-o" size="25" @click="channgeCollected"/>
  </div>
</template>

<script>
import { Collected, UnCollected } from '@/api/article'
export default {
  name: 'CollectArticle',
  model: {
    prop: 'collected',
    event: 'updataCollected'
  },
  // props: {
  //   arteId: {
  //     type: [Number, String, Object],
  //     required: true
  //   },
  //   collected: {
  //     type: Boolean,
  //     required: true
  //   }
  // },
  props: ['arteId', 'collected'],
  methods: {
    async channgeCollected () { // 点击收藏/取消收藏
      try {
        if (this.collected) { // 取消
          await UnCollected(this.arteId)
        } else { // 收藏
          await Collected(this.arteId)
        }
        this.$emit('updataCollected', !this.collected)
        this.$toast.success(!this.collected ? '收藏成功' : '取消收藏成功')
      } catch (error) {
        this.$toast('操作失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.yellow {
  color: #ffa500;
}
</style>
