<template>
  <div>
    <van-cell title="搜索历史">
      <!-- 点击全部删除按钮，出发父组件的自定义事件,因为子组件不能对父组件的数据进行赋值操作 -->
      <span v-if="isDelShow" class="allDel" @click="$emit('clearHist')">全部删除</span>
      <span v-if="isDelShow" @click="isDelShow = false">完成</span>
      <van-icon name="delete" v-if="!isDelShow" @click="isDelShow = true"/>
    </van-cell>
    <van-cell :title="item" v-for="(item, index) in searchHistoryList" :key="index" @click="delClick(item, index)">
      <van-icon name="close" size="15" v-if="isDelShow"/>
    </van-cell>
  </div>
</template>

<script>
import { searchHistory } from '@/api/search'
export default {
  name: 'searchHistory',
  data () {
    return {
      list: [],
      isDelShow: false // 控制删除状态显示
    }
  },
  props: {
    searchHistoryList: { // 由父组件传递过来的引用类型，只能修改（追加）不能重新赋值
      type: Array,
      required: true
    }
  },
  created () {
    // this.getHistory()
  },
  methods: {
    async getHistory () { // 获取历史数据
      try {
        const { data } = await searchHistory()
        this.list = data.data.keywords
      } catch (error) {
        this.$toast('获取搜索结果数据失败')
      }
    },
    delClick (val, index) { // 删除历史记录
      if (this.isDelShow) { // 删除状态
        this.searchHistoryList.splice(index, 1) // 删除历史数据，操作父组件传过来的引用数据对象是可以的，在对象身上删除新增都会同步到父组件，因为和父组件用的是同一个对象
      } else {
        this.$emit('searchT', val) // 删除状态为不删除，那就出发搜索事件
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.yyyy {
  font-size: 12px;
}
.allDel {
  margin-right: 20px;
}
</style>
