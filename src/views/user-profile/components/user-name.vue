<template>
  <div class="username">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('closeUserName')"
      @click-right="saveUpdate"
    />
    <div class="text">
      <van-field
      v-model="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'userName',
  data () {
    return {
      localName: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async saveUpdate () {
      try {
        const dataa = {
          name: this.localName
        }
        const { data } = await updateUserProfile(dataa)
        this.$emit('input', data.data.name) // 将更新完的昵称也返回，v-model双向数据绑定的默认绑定了input事件
        this.$toast.success('更新昵称成功')
      } catch (error) {
        this.$toast('更新昵称失败')
      }
      this.$emit('closeUserName') // 不管成功还是失败都关闭弹出层
    }
  }
}
</script>

<style lang="less" scoped>
.username {
  .text {
    padding: 25px 25px;
  }
.van-nav-bar {
  background-color: #fff!important;
  /deep/.van-nav-bar__title {
    color: #000!important;
  }
}
}
</style>
