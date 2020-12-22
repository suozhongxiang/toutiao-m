<template>
  <div>
    <!-- 未登录状态 -->
    <div class="header" v-if="!user">
      <div class="box" @click="login">
        <img
        class="mobile-img"
        src="~@/assets/mobile.png"
        @click="$router.push('/login')"
      >
      <span>登录 / 注册</span>
      </div>
    </div>
    <!-- 登录状态 -->
    <div class="header userinfo" v-else>
      <div class="base_top">
        <div class="left">
          <van-image
            class="active"
            round
            :src="userInfo ? userInfo.photo : '//img.yzcdn.cn/vant/cat.jpeg'"
          />
          <span>{{ userInfo ? userInfo.name : '黑马'}}</span>
        </div>
        <div class="right"><van-button type="default" size="mini" round>编辑资料</van-button></div>
      </div>
      <div class="base_down">
        <div class="base_down_item">
          <span>{{ userInfo ? userInfo.art_count : 99}}</span>
          <span>头条</span>
        </div>
        <div class="base_down_item">
          <span>{{ userInfo ? userInfo.follow_count : 99}}</span>
          <span>头条</span>
        </div>
        <div class="base_down_item">
          <span>{{ userInfo ? userInfo.fans_count : 99}}</span>
          <span>头条</span>
        </div>
        <div class="base_down_item">
          <span>{{ userInfo ? userInfo.like_count : 99}}</span>
          <span>头条</span>
        </div>
      </div>
    </div>
    <!-- 宫格导航 -->
      <van-grid :column-num="2" clickable>
        <van-grid-item>
          <i slot="icon" class="iconfont iconshoucang toutiao"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item>
          <i slot="icon" class="iconfont iconlishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell v-if="user" class="logout-cell" title="退出登录" center @click="onLogout" clickable/>
      <!-- clickable 具有交互点击效果 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      userInfo: null
    }
  },
  created () {
    if (this.user) {
      this.loadUser()
    }
  },
  methods: {
    login () { // 去登陆
      this.$router.push('login')
    },
    onLogout () { // 退出登录
      this.$dialog.confirm({ // 原组件中的这些方法要用vue实例调用，默认挂载在了vue实例身上了
        title: '退出提示',
        message: '确认退出吗'
      })
        .then(() => {
          this.$store.commit('setUser', null) // 直接调用vuex中写好的方法，一步到位，会将vuex和locall中的都为null，又因为vuex具有响应式的特点所以立即响应
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUser () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data
        console.log(this.userInfo)
      } catch (error) {
        this.$toast('获取数据失败')
      }
    }
  },
  computed: {
    ...mapState(['user']) // vuex中保存的token值，是响应式的，退出后为null,页面也会响应它为null，有些标签就会隐藏
  }
}
</script>

<style lang="less" scoped>
.header {
    height: 361px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
      display: flex;
      flex-direction: column;
      align-items: center;

    }
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 20px;
    }
    span {
      font-size: 30px;
      color: #fff;
    }
  }
  .userinfo {
    display: flex;
    flex-direction: column;
  }
  .base_top {
    height: 231px;
    width: 100%;
    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .left {
      height: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      .active {
        width: 132px;
        height: 132px;
        border: 2px solid #fff;
      }
      span {
        font-size: 29px;
        margin-left: 22px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      height: 100%;
      span {
        font-size: 14px;
        color: #000;
      }
    }
  }
  .base_down {
    width: 100%;
    height: 130px;
    display: flex;
    .base_down_item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100%;
      span:nth-child(1) {
      font-size: 36px;
      margin-bottom: 15px;
    }
    span:nth-child(2) {
      font-size: 23px;
    }
    }
  }
  .iconfont {
    font-size: 45px;
  }
  .iconshoucang {
    color: #EB5253;
  }
  .iconlishi {
    color: #FF9D1D;
  }
  .text {
    color: #000;
    margin-top: 8px;
    font-size: 28px;
  }
  .logout-cell {
  height: 100px;
  text-align: center;
  color: #EB5253;
  margin: 10px 0;
  font-size: 30px;
}
</style>
