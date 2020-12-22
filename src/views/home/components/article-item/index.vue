<template>
<!-- 此组件主要为定制展示每一个频道组件实例中的，每一行的内容格式 -->
<!-- 可以被重复使用到各个页面上,传入组件的数据为conent -->
  <div>
    <meta name="referrer" content="no-referrer" />
    <!-- 解决referrer问题 请求数据时不使用解决referrer问题就好了 -->
    <!-- 动态传参， -->
    <!-- 可以使用url地址形式，但是只能用$routr.params.xxx使用 -->
    <!-- 可以用props打开动态路由传参，传参是props可以为数组，对象，也可以是函数，在被跳转的组件中，也用props接收，和组件之间的父向子传值一样 -->
    <van-cell :to="{
      name: 'article',
      params: {
        articleId: conent.art_id
      }
    }">
      <div slot="title" class="title van-multi-ellipsis--l3">{{conent.title}}</div>
      <div slot="label">
        <!-- 有三张照片的情况 -->
        <div v-if="conent.cover.type === 3" class="imgs">
          <van-image v-for="(item, index) in conent.cover.images" :key="index" :src="item" class="actives" fit="cover"/>
        </div>
        <div class="down_title">
        <span>{{conent.aut_name}}</span>
        <span>{{conent.comm_count}}评论</span>
        <span>{{conent.pubdate | relativeTime}}</span>
        </div>
      </div>
      <!-- 右侧只有一张图片的情况 -->
      <van-image slot="default" v-if="conent.cover.type === 1"  :src="conent.cover.images[0]" class="active" fit="cover" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'articleItem',
  data () {
    return {}
  },
  props: {
    conent: {
      type: Object, // 必须大写
      required: true // 是否必须传递
    }
  }
}
</script>

<style lang="less" scoped>
.active {
   flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
}
.actives {
  flex: 1;
  width: 100%;
   height: 146px;
    &:not(:last-child) {
        padding-right: 4px;
      }
}
.imgs {
  display: flex;
  justify-content: center;
}
.title {
 color: #3a3a3a;
 font-size: 32px;
}
.down_title span{
   color: #b4b4b4!important;
   font-size: 22px;
   margin-right: 25px;
 }
</style>
