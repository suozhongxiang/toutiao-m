<template>
  <div>
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      :default-index="value"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'userGender',
  data () {
    return {
      columns: ['男', '女']
    }
  },
  props: ['value'],
  methods: {
    onConfirm (value, index) {
      try {
        const dataa = {
          gender: index
        }
        updateUserProfile(dataa)
        this.$emit('input', index)
        this.$toast.success('更新昵称成功')
      } catch (error) {
        this.$toast('修改性别失败')
      }
      this.$emit('closeUserName')
    },
    onCancel () {
      this.$toast('取消')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
