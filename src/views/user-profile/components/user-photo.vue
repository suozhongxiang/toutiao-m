<template>
  <div class="user-photo">
    <img :src="img" class="img" ref="img">
    <div class="bottom">
      <div @click="$emit('close')">取消</div>
      <div @click="savePhoto">确认</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'
export default {
  name: 'userPhoto',
  data () {
    return {
      cropper: null // 保存裁剪后的对象
    }
  },
  props: ['img'],
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
  },
  methods: {
    savePhoto () {
      // console.log(this.cropper.getData()) // 一般用于pc端，需要后盾配合，直接将这个对象发送给后端,类似于window.URL.createObjectURL(file)得到的blob数据对象
    // 纯前端的裁切使用getCroppedCanvas()
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updataPhoto(blob)
      })
    },
    async updataPhoto (blob) {
      this.$toast.loading({ // 一次只能展示一个toast事件，所以想让loading关闭就添加成功提示文本
        message: '保存中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      try {
        const fd = new FormData() // 根据接口文档提示,上传文件需要提供的参数为multipart/form-data，所以需要不能上传普通的js对象
        fd.append('photo', blob)
        const { data } = await updateUserPhoto(fd)
        this.$emit('updataPhoto', data.data.photo)
        this.$toast('更新成功')
      } catch (error) {
        this.$toast('更新头像失败')
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.user-photo {
  height: 100%;
  background-color: #000;
  .img {
  max-width: 100%;
  }
  .bottom {
    height: 100px;
    position:fixed;
    display: flex;
    justify-content: space-between;
    align-items:flex-end;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    color: #fff;
    div {
      margin:0 10px ;
      margin-bottom: 10px;
      width: 100px;
      height: 80px;
      font-size: 36px;
    }
  }
}
</style>
