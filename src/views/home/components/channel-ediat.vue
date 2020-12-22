<template>
  <div class="channle-ediat">
  <van-cell>
    <div slot="title">我的频道</div>
    <van-button  plain type="danger" round size="mini" class="btn" @click="isClear = !isClear">{{isClear ? '完成' : '编辑'}}</van-button>
  </van-cell>
  <!-- 宫格标签 -->
    <van-grid :gutter="10" class="my-frid">
      <van-grid-item v-for="(value,index) in mychannels" :key="index"  class="grid-item" @click="onMychannleClick(value, index)">
        <!-- v-bind:class = { 类名：布尔值 } 后面布尔值为真才会渲染改类名 -->
        <van-icon slot="icon"  name="clear" v-if="isClear && !notClear.includes(value.id)"/>
        <span class="text" :class="{active: active === index}" slot="text">{{ value.name }}</span>
      </van-grid-item>
    </van-grid>

  <van-cell>
    <!-- 全部频道内容 - 我的频道 = 推荐频道 -->
    <div slot="title">推荐频道</div>
  </van-cell>
  <!-- 宫格标签 -->
    <van-grid :gutter="10" class="down-grid">
      <van-grid-item v-for="value in tuijianCh" :key="value.id"  :text="value.name" class="grid-item" icon="plus" @click="setChannles(value)"/>
    </van-grid>
  </div>
</template>

<script>
import { getAllchannels, setChannle, delChannel } from '@/api/article'
import { mapState } from 'vuex'
import { setItem } from '@/utils/stroage'
export default {
  name: 'channelEdiat',
  data () {
    return {
      allChannels: [], // 全部的频道数据
      isClear: false, // 决定频道是否能被点击到删除状态
      notClear: [0, 11] // 默认不能被删除的频道Id
    }
  },
  props: {
    mychannels: { // 接受父组件传过来的我的频道数据
      type: Array,
      required: true
    },
    active: { // 被激活的频道页码
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllchannelss() // 获取全部的频道数据
  },
  methods: {
    async getAllchannelss () { // 获取所有频道列表
      try {
        const { data } = await getAllchannels()
        this.allChannels = data.data.channels
      } catch (error) {
        this.$toast('获取频道列表数据失败')
      }
    },
    async setChannles (value) { // 点击推荐频道添加到我的频道的数组里面，响应式
      this.mychannels.push(value) // 将点击的推荐对象加进去我的，根据计算属性，推荐频道也会改变
      if (this.user) { // 判断vuex中保存的登录状态，表示已登录，发送请求到后端
        try {
          await setChannle({
            id: value.id,
            seq: this.mychannels.length // 接口要求，传入添加频道的序列号（1开始）。因为从推荐列表添加进我的频道的永远在最后一个，所以为数组的长度
          })
        } catch (error) {
          this.$toast('保存失败')
        }
      } else { // 未登录,将我的频道的数据保存本地
        setItem('TOUTIAO_CHANNELS', this.mychannels) // 将我的频道设置的选项保存到本地,每一次点击都会保存一次
      }
    },
    onMychannleClick (value, index) { // 点击我的频道，删除选项
      if (!this.isClear) { // 判断是否点击了编辑按钮
        this.$emit('updateActive', index, false) // 将当前被点击我的频道数组的索引传到父组件，付需建接收后重新给active赋值。因为弹出层的我的频道列表是从父组件中接收的，索引数组的索引是一样的
      } else { // 点击编辑按钮的点击事件，删除我的频道中的选项
        if (this.notClear.includes(value.id)) return false// 如果点击的是默认不报删除的选项
        this.mychannels.splice(index, 1)
        if (index <= this.active) { // 判断是否点击的是active前方的
          this.$emit('updateActive', this.active - 1) // 解决删除选中标签前方的选项，后方会选中混乱问题
        }
        if (!this.user) { // 判断是不是登录状态
          setItem('TOUTIAO_CHANNELS', this.mychannels) // 未登录状态，将删除后的我的频道数组保存到本地
        } else {
          try {
            delChannel(value.id) // 调用导入的删除接口，做持久化操作
          } catch (error) {
            this.$toast('删除失败')
          }
        }
      }
    }
  },
  computed: {
    tuijianCh () { // 推荐频道数据的计算属性,但凡数据最终是根据别的数据得来的，都要用到计算属性
      return this.allChannels.filter(s => { // 双重遍历数组，拿道id后去我的里面查找id，只要有这个id就false,下一个id，都为true才添加
        return this.mychannels.every(m => m.id !== s.id) // every必须每个都符合条件才会范湖true
      })
    //   return this.allChannels.filter(channel => { // 老师的
    //     const mychannel = this.myChannels.find(myChannel => { // 找到id在我的频道里面的id是否存在
    //         return myChannel.id === channel.id // 如果存的话会使一个具体的对象
    //     })
    //     return !mychannel // 返回刚找到的对象，若有的话为对象，返回！为false。不保存；无的话为false，！后为true，保存
    // })
    },
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.channle-ediat {
  padding: 80px 10px 0;
}
.btn {
  width: 104px;
  height: 48px;
  font-size: 24px;
}
.van-cell__title {
  font-size: 32px;
  color: #333;
}
.van-cell {
  border: none;
}
/deep/.grid-item {
  width: 160px;
  height: 86px;
  /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text, .text {
        color: #222;
        font-size: 24px;
        white-space: nowrap;
      }
  }
}
.active{
    color: red!important;
  }
/deep/.down-grid {
  .van-grid-item__content{
    flex-direction: row;
    color: #222;
    .van-icon {
            font-size: 24px;
            margin-right: 10px;
        }
        .van-grid-item__text {
            font-size: 24px;
            margin-top: 0;
        }
  }
}
/deep/.my-frid {
.van-grid-item__icon-wrapper{
  position:unset;
}
.van-icon{
  position:absolute;
  right: -10px;
  top: -10px;
  font-size: 36px;
  color: #ccc;
}
}
</style>
