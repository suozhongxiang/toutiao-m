<template>
  <!-- 此页面组件主要展示不同频道的不同新闻内容，因为同一个组件可以有不同的实例，所以不同的频道有不同的实例，中间的内容也是不一样的 -->
  <div>
<van-pull-refresh v-model="pullisLoading" @refresh="pullonRefresh">
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    class="list"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
  >
  <!-- 遍历获取到的数据 -->
    <article-item v-for="item in list" :key="item.id" :conent="item"/>
    <!-- <van-cell v-for="item in list" :key="item.id" :title="item.title" /> -->
  </van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import { getList } from '@/api/article'
import articleItem from './article-item'
export default {
  name: 'articleList',
  data () {
    return {
      list: [], // 用于保存改频道一应的新闻数据，会随着用户不断的请求而被push，具有缓存的效果
      loading: false, // 控制显示loding图标，在加载时为true
      finished: false, // 控制显示底部无文字，加载完为true
      timestamps: null, // 时间戳，第一次请求是为null,会发送一个当下的时间戳，之后就拿到后端返回的最新时间戳进行请求下一次数据
      error: false, // 错误提示
      pullisLoading: false // 刷新等待图标文字
    }
  },
  components: {
    articleItem
  },
  created () {
    this.$toast.setDefaultOptions({ duration: 1500 })
  },
  props: { // props 可以以数组形式接受，也可以对象形式
    channel: { // 接受产地过来的频道列表数据
      type: Object, // 传递数据类型
      required: true // 是否必须传递
    }
  },
  methods: {
    async onLoad () { // 发起请求是带着时间戳和id,返回的数据追加到数组中，判断数组长度是否为0，从而得知是否要开始下一次请求，不为0更新时间戳，等待出发请求后，开始下一轮，为0则停止
      try {
        const params = {
          channel_id: this.channel.id, // 每一个频道列表对应的id
          timestamp: this.timestamps || Date.now(), // 时间戳new Date().valueOf()，请求新的推荐数据传当前的 时间戳，请求历史推荐传指定的时间戳,后端用于区别给你返回什么数据，知道你每次滑动到哪了，从哪开始给你返回数据，如果有代表第n次请求了，如果为null代表第一次
          with_top: 1 // 知否返回置顶的消息
        }
        const { data } = await getList(params)
        this.list.push(...data.data.results) // 将每次请求出来的数据都追加到数组中去，每次请求数组都会不停的壮大，做到了缓存的效果
        this.loading = false // 本次加载完毕，将loding图标关闭，加载数据的时候会自己动为true
        if (data.data.results.length) { // 如果不为0代表还有数据，通过判断每次请求回来的数据是否为0开支带是不是到底了
          this.timestamps = data.data.pre_timestamp // 给下一次请求赋予时间戳
        } else {
          this.finished = true // 将展示完文字打开
        }
        if (Math.random() > 0.5) { // 模拟失败
          JSON.parse('sdad')
        }
      } catch (err) {
        this.error = true // 显示错误信息
        this.loading = false // 关闭加载
      }
    },
    async pullonRefresh () { // 刷新列表数据，获取数据，获取成功从数组前方添加进去，关闭loding，弹出提示。获取失败,提示失败语句，关闭loding
      try {
        const params = {
          channel_id: this.channel.id, // 每一个频道列表对应的id
          timestamp: Date.now(), // 刷新列表每次都获取最新的数据，普通下来滚动获取的为后端返回的数据，是陈年老旧的数据
          with_top: 1 // 知否返回置顶的消息
        }
        const { data } = await getList(params)
        this.list.unshift(...data.data.results)
        this.pullisLoading = false
        this.$toast(`新增了${data.data.results.length}条数据`)
        if (Math.random() > 0.5) { // 模拟失败
          JSON.parse('sdad')
        }
      } catch (error) {
        this.pullisLoading = false
        this.$toast('刷新列表失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  padding-bottom: 100px;
}
</style>
