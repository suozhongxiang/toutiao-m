<template>
  <div class="comment-repaly">
    <div class="top">
      <van-nav-bar
      :title="currentComment.reply_count > 0 ? `${currentComment.reply_count}条回复` : '暂无数据'"
    >
    <van-icon slot="left" color="#2793ff" name="cross" @click="$emit('colseCurrent')"/>
    </van-nav-bar>
    <!-- 楼主信息 -->
    <comments-items :commentsData="currentComment" @replyShow="lou"/>
    </div>
    <!-- 楼成员 -->
    <van-cell title="所有回复" />
    <div class="bottom">
    <!-- 传递评论的id -->
    <comment-list :arteId="currentComment.com_id" :list="list" :type="'c'" @replyShow="lol"/>
    </div>
    <div class="swap-wa">
      <van-button round @click="lou">写评论</van-button>
    </div>
    <!-- 回复楼主评论弹出层 -->
    <van-popup v-model="iscouetershow" position="bottom" :style="{ height: '30' }" >
      <commentPost :Id="currentComment.com_id" :artID="articlesId" :cutObj="cutObj" @postSuccess="onPostSuccess($event)"/>
    </van-popup>
  </div>
</template>

<script>
import commentsItems from './comment-items'
import commentList from './comment-list'
import commentPost from './comment-post'
export default {
  name: 'commentRepaly',
  data () {
    return {
      list: [], // 展示该评论的回复
      iscouetershow: false, // 回复楼主弹出层
      cutObj: null
    }
  },
  inject: ['articlesId'], // 接受父组件的依赖注入数据
  props: {
    currentComment: {
      type: Object,
      required: true
    }
  },
  components: {
    commentsItems,
    commentList,
    commentPost
  },
  methods: {
    onPostSuccess (data) { // 接受子组件传递过来的添加成功的新对象传值
      this.list.unshift(data.new_obj) // 将这个对象添加到当前数组最前方
      this.iscouetershow = false
      this.currentComment.reply_count += 1
    },
    lou () { // 判断你是回复楼主还是回复用户
      this.cutObj = this.currentComment
      this.iscouetershow = true
    },
    lol (data) {
      this.cutObj = data
      this.iscouetershow = true
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #fff!important;
  /deep/.van-nav-bar__title {
    color: #000!important;
    }
}
 .bottom {
    position:fixed;
    top:450px;
    left: 0;
    right: 0;
    bottom: 86px;
    overflow: auto;
  }
.swap-wa {
  position:fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 86px;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-button  {
  border-top: 1px solid #ccc;
    height: 60px;
    width: 450px;
  }
}
</style>
