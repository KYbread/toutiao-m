<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain class="edit-btn"
      @click="changeBtn"
        >{{isShow?'完成':'编辑'}}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="channel-item"
        v-for="(item, index) in myChannels"
        :key="index"
        :class="{active:item.id===currentId}"
        @click="remove(index)"
      >
      <template #icon v-if="isShow">
      <van-icon  name="cross" />
      </template>
      <template #text>
        <div class="txt">
          {{ item.name }}
        </div>
      </template>
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="channel-item"
        v-for="(item, index) in recommendChannels"
        :key="index"
        :class="{active:item.id===currentId}"
        :text="item.name"
        @click="add(index)"
        icon="plus"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    currentId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isShow: false,
      allChannels: []
    }
  },
  computed: {
    recommendChannels () {
      // 简化版
      return this.allChannels.filter((Channel) => {
        return !this.myChannels.find(myChannel => {
          return myChannel.id === Channel.id
        })
      })
      // const channels = []
      // this.allChannels.forEach((Channel) => {
      //   const result = this.myChannels.find((myChannel) => {
      //     return myChannel.id === Channel.id
      //   })
      //   if (!result) channels.push(Channel)
      // })
      // return channels
    }
  },
  watch: {},
  created () {
    this.getAllChannel()
  },
  mounted () {},
  methods: {
    changeBtn () {
      this.isShow = !this.isShow
      // 使用设置-频道列表接口？
      // if (this.isShow) {
      //   this.myChannels.forEach((myChannel, index) => {
      //     const newMyChannels = []
      //     newMyChannels[index].id = myChannel.id
      //     newMyChannels[index].seq = index
      //   })
      // }
    },
    remove (i) {
      // 此处子组件修改父组件的对象属性是有效的，
      // 但eslint不允许单向数据流中子组件向父组件传值，
      // 此处严格来说应使用子传父
      if (this.isShow) {
        this.apis.HomePage.DelMyChannelList(this.myChannels[i].id)
          .then((res) => {
            console.log(res)
          })
        // eslint-disable-next-line vue/no-mutating-props
        this.myChannels.splice(i, 1)
      } else {
        this.$emit('changeCurrentId', this.myChannels[i].id)
      }
    },

    add (i) {
      // 此处子组件修改父组件的对象属性是有效的，
      // 但eslint不允许单向数据流中子组件向父组件传值，
      // 此处严格来说应使用子传父
      // eslint-disable-next-line vue/no-mutating-props
      this.myChannels.push(this.recommendChannels[i])
      if (this.$store.state.user) {
        const newMyChannels = []
        this.myChannels.forEach((Channel, index) => {
          const newMyChannel = {}
          newMyChannel.id = Channel.id
          newMyChannel.seq = index
          newMyChannels.push(newMyChannel)
        })
        this.apis.HomePage.setMyChannelList(newMyChannels)
      } else {
        localStorage.setItem('myChannels', JSON.stringify(this.myChannels))
      }
    },
    getAllChannel () {
      this.apis.HomePage.getAllChannelList().then(
        res => {
        // console.log(res)
          this.allChannels = res.data.data.channels
        }
      ).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  /deep/ .my-grid {
    .van-grid-item__content {
      padding: 0;
      flex-direction: row;
      width: 162px;
      color: #222;
      .van-grid-item__icon-wrapper{
        position: absolute;
        width: 100%;
        height: 100%;
.van-icon {
        position: absolute;
        top:-12px;
        right:-18px;
        font-size: 24px;
        margin-right: 6px;
      }
      }
    }
  }
  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      width: 162px;
      color: #222;
      .van-icon {
        font-size: 24px;
        margin-right: 6px;
      }

      .van-grid-item__text {
        white-space: nowrap;
        font-size: 28px;
        margin-top: 0!important;
        /deep/ .van-icon-close {
          position: absolute;
          right: -10px;
          top: -10px;
          font-size: 36px;
          color: #ccc;
        }
      }
    }
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
  }
  .channel-item {
    height: 86px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 28px;
      }
    }
  }

}
 /deep/ .active{
    .txt{
      color: red!important;
    }
  }
  /deep/ .txt{
    font-size: 0.37333rem;
  }
</style>
