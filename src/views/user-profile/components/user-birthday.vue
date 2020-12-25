<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="saveUpdate"
    />
  </div>
</template>

<script>
import dayJs from 'dayjs'
import { updateUserProfile } from '@/api/user'
export default {
  name: 'userBirthday',
  data () {
    return {
      minDate: new Date(1912, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: this.value === '' ? new Date() : new Date(this.value) // 三目运算符
    }
  },
  props: ['value'],
  methods: {
    async saveUpdate () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUserProfile({
          birthday: dayJs(this.currentDate).format('YYYY-MM-DD')
        })
        this.$emit('input', dayJs(this.currentDate).format('YYYY-MM-DD')) // 将最新数据传回去展示
        this.$toast('更新成功')
      } catch (err) {
        this.$toast('更新失败')
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
