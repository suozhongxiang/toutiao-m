<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      left-arrow
    />
    <!-- 头像框上传文件，手写input，然后隐藏，获取他的dom,触发他的点击事件 -->
    <input type="file" hidden ref="file" @change="onFileChange">
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        round
        slot="default"
        :src="user.photo"
      />
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="userNameUpdate = true"/>
    <van-cell title="性别" is-link :value="user.gender === 0 ? '男' : '女'" @click="userGenderUpdate = true"/>
    <van-cell title="生日" is-link @click="userBirthdayUpdate = true">
      <span slot="default">{{ user.birthday ? user.birthday : '暂无数据'}}</span>
    </van-cell>
    <!-- 修改昵称弹出层 -->
    <van-popup v-model="userNameUpdate" position="bottom" :style="{ height: '100%', backgroundColor : '#f5f7f9'}" >
      <user-name  v-if="userNameUpdate" v-model="user.name" @closeUserName="userNameUpdate = false"/>
    </van-popup>
    <!-- 修改性格弹出层 -->
    <van-popup v-model="userGenderUpdate" position="bottom" :style="{  backgroundColor : '#f5f7f9'}" >
      <user-gender
      v-if="userGenderUpdate"
      v-model="user.gender"
      @closeUserName="userGenderUpdate = false"/>
    </van-popup>
    <!-- 修改生日弹出层 -->
    <van-popup v-model="userBirthdayUpdate" position="bottom" :style="{  backgroundColor : '#f5f7f9'}" >
      <user-birthday
      v-if="userBirthdayUpdate"
      v-model="user.birthday"
      @close="userBirthdayUpdate = false"/>
    </van-popup>
    <!-- 展示头像弹出层 -->
    <van-popup v-model="userPhoto" position="bottom" :style="{ height: '100%', backgroundColor : '#f5f7f9'}" >
      <user-photo :img="userimg" @close="userPhoto = false" @updataPhoto="user.photo = $event"/>
    </van-popup>
  </div>
</template>

<script>
import { getUserSelf } from '@/api/user'
import userName from './components/user-name'
import userGender from './components/user-gender'
import userBirthday from './components/user-birthday'
import userPhoto from './components/user-photo'
export default {
  data () {
    return {
      user: '',
      userNameUpdate: false,
      userGenderUpdate: false,
      userBirthdayUpdate: false,
      userPhoto: false,
      userimg: '' // 保存用户传的头像blob数据
    }
  },
  components: {
    userName,
    userGender,
    userBirthday,
    userPhoto
  },
  created () {
    this.getuser()
  },
  methods: {
    async getuser () { // 获取用户信息
      try {
        const { data } = await getUserSelf()
        this.user = data.data
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    onFileChange () { // 当上传文件框有文件改变时
      const file = this.$refs.file.files[0] // 拿到上传的文件对象
      // 基于文章对象获取blob数据
      this.userimg = window.URL.createObjectURL(file)
      this.userPhoto = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  /deep/.van-nav-bar .van-icon {
    color: #ffffff;
  }
  .van-image {
    width: 60px;
    height: 60px;
  }
}
</style>
