<template>
  <div>
    <van-cell>
          <van-image
        round
        cover
        :src="commentsData.aut_photo"
      />
    <div >
      <div class="title">{{commentsData.aut_name}}</div>
      <div class="content">{{commentsData.content}}</div>
      <div class="bottom">
        <span>{{commentsData.pubdate | relativeTime}}</span>
        <!-- 孙子组件向爷爷传值，点击回复打开回复评论的弹出层 -->
        <van-button type="primary" size="mini" round @click="$emit('replyShow',commentsData)"><i>{{commentsData.reply_count}}</i>回复</van-button>
      </div>
    </div>
    <div slot="right-icon" class="right">
      <van-button
        class="like-btn"
        :color="commentsData.is_liking ? 'red' : ''"
        :icon="commentsData.is_liking ? 'good-job' : 'good-job-o'"
        round @click="onCommentLike"
      >{{ commentsData.like_count || '赞' }}</van-button>
    </div>
    </van-cell>
  </div>
</template>

<script>
// import likeArticle from '@/components/like-article'
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'commentsItems',
  // components: {
  //   likeArticle
  // },
  data () {
    return {
      show: true
    }
  },
  props: {
    commentsData: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onCommentLike () { // 点赞评论
      if (this.commentsData.is_liking) { // 如果已经赞了则取消点赞
        await deleteCommentLike(this.commentsData.com_id)
        this.commentsData.like_count -= 1
      } else { // 如果没有赞，则点赞
        await addCommentLike(this.commentsData.com_id)
        this.commentsData.like_count += 1
      }
      this.commentsData.is_liking = !this.commentsData.is_liking // 更新视图状态
      this.$toast('操作成功')
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell__value {
  display: flex;
}
.van-button {
  width: 130px;
  height: 50px;
  background-color: #f4f5f6;
  border: 1px solid #f5f6f7;
  .van-button__text {
    margin-right: 0;
  }
}
.title {
  font-size: 24px;
  color: #43679b;
}
.content {
  font-size: 30px;
  color: #222222;
}
.bottom {
  span {
    font-size: 10px;
    color: #232323;
    margin-right: 40px;
  }
  i {
    font-style: normal;
  }
}
  .van-image {
  width: 70px;
  height: 70px;
  margin-right: 24px;
}
.right {
  display: flex;
  span {
    margin-left: 15px;
  }
}
</style>
