<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <!-- 开启路由模式后，下方对应选中的选项和哈希值一致同步 所以刷新不会重置选项选中-->
      <van-tabbar-item to="/home"><i slot="icon" class="iconfont iconshouye"></i><span class="text">首页</span></van-tabbar-item>
      <van-tabbar-item to="/wen"><i slot="icon" class="iconfont iconwenda"></i>问答</van-tabbar-item>
      <van-tabbar-item to="/video"><i slot="icon" class="iconfont iconshipin"></i>视频</van-tabbar-item>
      <van-tabbar-item to="/my"><i slot="icon" class="iconfont iconwode"></i>{{$store.state.user ? '我的' : '未登录'}}</van-tabbar-item>
      <!-- 三目运算符确定显示文字 -->
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 40px;
}
span.text {
  font-size: 20px;
}
</style>
