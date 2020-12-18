<template>
  <div>
    <div class="header">
      <div class="box" @click="login">
        <img
        class="mobile-img"
        src="~@/assets/mobile.png"
        @click="$router.push('/login')"
      >
      <span>登录 / 注册</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  login () {
    this.$router.push('/login')
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
      margin-bottom: 15px;
    }
    span {
      font-size: 40px;
    }
  }
</style>
