<template>
  <div>
    <!-- 顶部 -->
    <van-nav-bar fixed>
      <!-- 具名插槽 -->
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to='search'
      >搜索</van-button>
    </van-nav-bar>
    <!-- tab -->
    <van-tabs v-model="active" animated swipeable class="tab">
      <!-- 遍历得到的频道数据，将其展示 -->
      <!-- 频道列表 -->
      <van-tab :title="item.name" v-for="item in UserChannels" :key="item.id">
        <!-- 组件化开发思想，每一个频道对应不同的组件，不同组件中展示不同的新闻内容 -->
        <!-- 将生成的每一个频道对象传递进新闻列表中 -->
        <!-- 调用生成频道列表组件 -->
        <ariticle-list :channel="item"/>
        <!-- 将遍历的每一个项目对象传递给这个文章组件 -->
      </van-tab>
      <!-- 占位置，将汉堡层的位置占住，方便之后滑动到底部会显示出最后一个 -->
      <!-- 三层汉堡 -->
      <div class="zhan" slot="nav-right"></div>
      <div slot="nav-right" class="hamburger-btn" @click="showChannelEdiat">
        <i class="iconfont icongengduo"></i>
    </div>
    </van-tabs>
    <!-- 汉堡弹出层 -->
    <van-popup
      v-model="isChannelEdiatShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }">
      <!-- 频道列表组件 -->
      <channel-ediat :mychannels="UserChannels" :active="active" @updateActive="updateActive"/>
      <!-- 将当前被激活的频道页码传递给组件 -->
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ariticleList from './components/article-list' // 导入文章列表的组件
import channelEdiat from './components/channel-ediat' // 导入频道列表组件
import { mapState } from 'vuex' // 导入vuex容器的共享数据
import { getItem } from '@/utils/stroage'
export default {
  name: 'home',
  data () {
    return {
      active: 0, // 当前激活的页码
      UserChannels: {}, // 获取用户账号的频道
      isChannelEdiatShow: false // 控制编辑频道弹出层展示隐藏
    }
  },
  components: {
    ariticleList, // 同一个组件可以有多个实例，不同的实例之间数据是相互独立的
    channelEdiat
  },
  created () {
    this.getUserChannelss()
  },
  methods: {
    async getUserChannelss () { // 获取频道列表
      if (this.user || !getItem('TOUTIAO_CHANNELS')) { // 判断用户登录了或者本地存储中没有数据（第一次登录，或者手动删除了）
        try {
          const { data } = await getUserChannels()
          this.UserChannels = data.data.channels
        } catch (error) {
          this.$toast('获取频道列表数据失败')
        }
      } else {
        this.UserChannels = getItem('TOUTIAO_CHANNELS')
      }
    },
    showChannelEdiat () { // 点击三层汉堡
      this.isChannelEdiatShow = true
    },
    updateActive (index, bl = true) {
      this.active = index // 重新给选中的频道页码赋值，又因为将active发送给了子组件，所以会响应式展示
      this.isChannelEdiatShow = bl
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
 .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/.van-nav-bar__title { // 样式穿透，因为有scoped属性，是的样式代码只作用于当前组件，组件样式无法得到修改
    max-width: unset;
  }
  /deep/.tab{
    border-bottom: 1px solid #EDEFF3;
    // margin-top: 98px;
    /deep/.van-tabs__wrap {
      position: fixed;
      z-index: 1;
      left: 0;
      right: 0;
      top: 92px;
      height: 100px;
    }
    .list {
      margin-top: 193px;
      height: 79vh; // 设置视口
      overflow-y: auto; // 增加容器滚动条
    }
    .van-tab {
      border-right: 1px solid #EDEFF3;
      min-width: 200px;
      height: 80px;
    }
    .van-tab__text {
    font-size: 27px;
    color: #777777;
  }
  .van-tab--active .van-tab__text{
  color: #333 !important;
}
.van-tabs__line {
  width:31px !important;
  height:6px;
  background:rgba(50,150,250,1);
  border-radius:3px;
  bottom: 8px;
}
.van-tabs__nav {
  padding: 0;
}
.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  z-index: 111;
  i.toutiao {
    font-size: 33px;
  }
  &:before { // 增加一个伪类，显示左侧的小渐变灰条
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png); // 使用图片
    background-size: contain;
  }
}
.zhan {
  width: 66px;
  height: 82px;
  flex-shrink: 0; // 不参与flex布局的分割
  z-index: 111;
}
  }
</style>
