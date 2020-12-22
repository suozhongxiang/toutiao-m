<template>
  <div class="article">
     <!-- 导航栏 -->
    <van-nav-bar
      title="黑马头条"
      left-arrow
      @click-left="onClickLeft"
    >
    <van-icon slot="right" name="ellipsis" style="font-size: 24px"/>
    </van-nav-bar>
    <!-- 加载中 -->
    <div class="loding">
      <van-loading color="#3296fa" vertical />
    </div>
     <!-- 加载完成-文章详情 -->
     <div class="article-detail">
       <h1 class="title">文章标题</h1>
       <van-cell>
         <van-image
          round
          cover
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          slot="icon"
        />
          <span slot="title">lalal</span>
          <span slot="label">11</span>
         <van-button slot="default" round color="#3296fa" icon="plus">关注</van-button>
       </van-cell>
     </div>
     <!-- 文章内容 -->
     <div class="article-content">这是文章内容</div>
     <!-- 分割线 -->
     <van-divider>正文结束</van-divider>
     <!-- 加载失败：404 -->
      <div class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->
      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <!-- 底部区域 -->
      <div class="avt-buttom">
        <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon class="iconfont icondianzan" />
      <van-icon class="iconfont iconpinglun grd" badge="28" />
      <van-icon class="iconfont iconshoucang grd" />
      <van-icon class="iconfont iconfenxiang grd" />
      </div>
  </div>
</template>

<script>
export default {
  name: 'article',
  props: {
    articleId: {
      type: [Number, String], // 为什么要写数组和字符串呢，因为只有在组件内部点击接受的才是数字类型，在url地址中哈希跳转的为字符串类型
      required: true
    }
  },
  // props: ['articleId'] // props也可以这样接收
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  /deep/.van-nav-bar .van-icon{
    color: #fff;
  }
  .loding {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  .title {
    font-size: 40px;
    color: #3a3a3a;
  }
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .van-image {
    width: 70px;
    height: 70px;
    margin-right: 16px;
  }
  /deep/.van-cell__title {
    font-size: 22px;
  }
  .van-button {
    width: 170px;
    height: 60px;
    .van-button__content {
      font-size: 28px;
    }
  }
   .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }
  .avt-buttom {
    display: flex;
    align-items: center;
    height: 88px;
    border-top: 1px solid #e1e1e1;
    background-color: #fff;
    padding: 0 30px;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      margin-left: 45px;
    }
    .grd {
      color:#777777;
    }
  }
}
</style>
