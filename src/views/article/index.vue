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
    <div class="zhan"></div>
    <div class="conent">
      <!-- 加载中 -->
    <div class="loding" v-if="isLoding">
      <van-loading color="#3296fa" vertical />
    </div>
       <!-- v-else-if="articles.title" 代表里面有数据，所有才会渲染 -->
     <div v-else-if="articles.title"><!-- 加载完成-文章详情 -->
     <div class="article-detail">
       <h1 class="title">{{articles.title}}</h1>
       <van-cell>
         <van-image
          round
          cover
          :src="articles.aut_photo"
          slot="icon"
        />
          <span slot="title">{{articles.aut_name}}</span>
          <span slot="label">{{articles.pubdate | relativeTime}}</span>
          <!-- <van-button v-if="articles.is_followed" slot="default" round  @click="onfllow" type="default" :loading="fllowShow">已关注</van-button>
         <van-button v-else slot="default" round color="#3296fa" icon="plus" @click="onfllow" :loading="fllowShow">关注</van-button> -->
         <!-- 自己封装的关注组件
         将需要的数据通过父向子传值发送给孩子
         将孩子需要修改父亲的数据通过儿子触发父亲的自定义事件形式传递
         -->
         <!-- <followUser :followedBel="articles.is_followed" :articleId="articles.aut_id"
         @updataFollowed="articles.is_followed = $event"
         /> -->
         <followUser :articleId="articles.aut_id" v-model="articles.is_followed"/>
       </van-cell>
     </div>
     <!-- 文章内容 -->
     <div class="article-content markdown-body" v-html="articles.content" ref="articlesContentRef"></div>
     <!-- 分割线 -->
     <van-divider>正文结束</van-divider>
     </div>
     <!-- 加载失败：404 只有在错误码为404的情况下才会报错-->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->
      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <!-- 文章评论 list有改变会同步到子组件-->
     <commentList :arteId="articleId" @onloadSuccess="articleCommentNum = $event.total_count" :list="successList" @replyShow="onreplyShow"/>
    </div>
      <!-- 底部区域 -->
      <div class="avt-buttom">
        <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="show = true"
      >写评论</van-button>
      <!-- <van-icon class="iconfont icondianzan" /> -->
      <like-article :arteId="articles.art_id" v-model="articles.attitude"/>
      <van-icon class="iconfont iconpinglun grd" :badge="articleCommentNum" />
      <!-- 文章收藏组件 -->
      <collect-article :arteId="articles.art_id" v-model="articles.is_collected"/>
      <van-icon class="iconfont iconfenxiang grd" />
      </div>
      <!-- 评论弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }" >
      <commentPost :Id="articleId" @postSuccess="onPostSuccess($event)"/>
    </van-popup>
      <!-- 回复用户弹出层 -->
    <van-popup v-model="isshow" position="bottom" :style="{ height: '95%' }" >
      <!-- v-if 解决组件关闭后组件内部的数据还在,导致loding函数不调用
      v-if创建和销毁组件
       -->
      <comm-replay  v-if="isshow" :currentComment="currentComment" :artID="articles.art_id" @colseCurrent=" isshow = false "/>
    </van-popup>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import followUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import likeArticle from '@/components/like-article'
import commentList from './comment-list'
import commentPost from './comment-post'
import commReplay from './comment-replay'
export default {
  name: 'articlee',
  data () {
    return {
      articles: [], // 文章数据
      isLoding: true,
      errStatus: 0, // 保存的是错误代码，在错误后如果为404，则会添加进来，上面的标签会拿此进行渲染
      articleCommentNum: 0, // 保存文章评论总数
      show: false, // 控制评论弹出层
      successList: [], // 向评论组件传递的数组，为了在发布评论后，可以将最新的发布的数据添加新数组中，不用刷新页面或者重新调取接口
      isshow: false, // 回复用户弹出层
      currentComment: null // 用来保存被评论回复的用户对象，由孙子组件点击回复按钮触发传值，然后Index组件又传值给评论回复组件
    }
  },
  provide: function () { // 像子组件发送依赖注入的数据
    return {
      articlesId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object], // 为什么要写数组和字符串呢，因为只有在组件内部点击接受的才是数字类型，在url地址中哈希跳转的为字符串类型
      required: true
    }
  },
  // props: ['articleId'] // props也可以这样接收
  methods: {
    onClickLeft () { // 点击返回
      this.$router.back()
    },
    async getArticle () { // 获取文章内容
      this.isLoding = true
      try {
        // 这里请求的articleId是通过第三次js插件转化的，默认的json.parse转化的不准确
        const { data } = await getArticleById(this.articleId)
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsadsadsadsad ')
        // }
        this.articles = data.data
        // 赋值之后，数据层影响视图层，会有延迟，说白了就是数据this.articles = data.data进行赋值，触发了defino双向数据绑定，然后dom元素被重新渲染，再渲染的时候又v-if判断一大堆，导致时间慢了
        setTimeout(() => {
          this.preViewImg() // 处理获取过来的文章内容，找出图片给图片增加预览效果哦
        }, 0)
      } catch (error) {
        // 加载失败 404
        if (error.response && error.response.status === 404) {
          this.errStatus = 404 // 将错误码置为404,主要是在v-if判断渲染的时候，拿着这个转态码可以区分错误是404还是网络错误
        }
      }
      this.isLoding = false // 请求获取完了就关闭loging
    },
    preViewImg () { // 拿到文章dom对象，通过querySelectorAll-Api方法找出改父节点下的所有Img的dom对象，然后将这些图片的src地址保存到数组里面，然后给这些图片遍历的时候顺便新增点击事件（调用vant内置的图片预览api）
      const imgs = this.$refs.articlesContentRef.querySelectorAll('img')
      const srcs = []
      imgs.forEach((img, index) => {
        srcs.push(img.src) // 将图片地址加入新数组
        img.onclick = () => {
          ImagePreview({ // 调用vant组件里面的方法，展示图片预览
            images: srcs,
            startPosition: index // 点击图片的起始位置，不写始终默认第一个
          })
        }
      })
    },
    onPostSuccess (data) { // 由子组件控制，发布成功后将后端返回的最新的数据返回Index组件，接收后再出插入数组
      this.successList.unshift(data.new_obj) // 将最新数添加到数组前面，然后这个数组通过自定义属性有发向渲染评论列表的子组件
      this.show = false
      this.articleCommentNum += 1
    },
    onreplyShow (data) { // 评论子组件中回复评论，触发index组件的函数
      this.isshow = true
      this.currentComment = data // 将点击的回复对象传值给变量，变量又传值给评论回复组件
    }
  },
  created () {
    this.getArticle()
  },
  components: {
    followUser, // 注册自己写的关注组件
    CollectArticle,
    likeArticle,
    commentList,
    commentPost,
    commReplay
  }
}
</script>

<style lang="less" scoped>
.article {
  /deep/.van-nav-bar .van-icon{
    color: #fff;
  }
  .van-nav-bar {
    position:fixed;
    width: 100%;
  }
  .conent {
    height: 84.8vh;
    overflow-y: auto;
    background-color: #fff;
  }
  .zhan {
    height: 96px;
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
    /deep/.van-icon { // 样式穿透，当前只作用到根节点，deep会影响下级
      margin-left: 45px;
      font-size: 40px;
    }
    /deep/.grd {
      color:#777777;
    }
    .xx {
      color: #000;
    }
  }
}
</style>
