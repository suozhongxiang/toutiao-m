<template>
  <div>
    <!-- 导航条 -->
    <van-nav-bar title="登录"><van-icon name="cross" slot="left" @click="$router.back()"/></van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="loginFormRef">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11">
        <i slot="left-icon" class="iconfont iconshouji xi"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        maxlength="6">
        <i slot="left-icon" class="iconfont iconyanzhengma xi"></i>
         <template #button>
           <van-count-down :time="1000 * 5" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow=false,isCountBtmShow=true"/>
          <van-button size="small" round class="yanzheng-btn" native-type="button" @click="yanzheng" v-if="isCountBtmShow">获取验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn">
        <van-button block type="info" native-type="onSubmit" >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user' // 按需导入
export default {
  data () {
    return {
      user: { // 双向数据绑定
        mobile: '',
        code: ''
      },
      userFormRules: { // 表单验证规则
        mobile: [ // 通过native-type按钮也会触发表单校验，验证通过后会触发onSubmit事件，不通过不会触发
          { required: true, message: '必须输入' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确格式' }
        ],
        code: [
          { required: true, message: '必须输入' },
          { pattern: /^\d{6}$/, message: '请输入正确验证码' }
        ]
      },
      isCountDownShow: false,
      isCountBtmShow: true
    }
  },
  methods: {
    async onSubmit () { // 提交表单
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try { // 通过try catch 来获取请求之后的结果
        const { data: res } = await login(this.user) // 接受axios对象返回的值可then，可以await进行解构赋值判断，也可以进行try/catch
        this.$store.commit('setUser', res.data) // 调用vuex方法将token数据保存vuex容器中
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('验证码错误')
        } else {
          this.$toast.fail('未知错误')
        }
      }
    },
    async yanzheng () { // 发送验证码
      try {
        await this.$refs.loginFormRef.validate('mobile') // 触发手机号校验
      } catch (error) {
        return this.$toast.fail('手机号格式有误')
      }
      this.isCountDownShow = true // 开启倒计时
      this.isCountBtmShow = false // 隐藏按钮
      try {
        await sendSms(this.user.mobile) // 发送验证码
        this.$toast.success('发送成功请查收')
      } catch (error) {
        // console.log(error.response) // 返回的是错误响应对象
        if (error.response.status === 429) return this.$toast.fail('不能频繁发送')
        return this.$toast.fail('出错')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.yanzheng-btn {
  height: 50px;
  color: #8a8a8a;
  font-size: 12px!important;
  background-color:#eeeeee;
}
.login-btn {
  padding: 53px 33px;
  .van-button--info {
    background-color:#66b1ff;
    border: 0;
    border-radius: 10px;
  }
}
.xi {
  font-size: 30px!important;
}
.van-nav-bar .van-icon {
  color: #fff;
}
</style>
