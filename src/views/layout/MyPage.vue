<template>
  <div>
    <!-- 已登录 -->
    <div v-if="user" class="userInfo header">
      <!-- 基本信息 -->
      <div class="base">
        <div class="left">
          <van-image
            fit="cover"
            :src="userinfo.photo?userinfo.photo:'https://img.yzcdn.cn/vant/cat.jpeg'"
            class="avatar"
            round
          />
          <span class="name">{{userinfo.name}}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round :to="{name:'UserProfile'}" >编辑资料</van-button>
        </div>
      </div>
      <!-- 粉丝、关注 -->
      <div class="data">
        <div class="data-item">
          <span>{{userinfo.art_count}}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{userinfo.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{userinfo.fans_count}}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{userinfo.like_count}}</span>
          <span>获赞</span>
        </div>
      </div>
      <!-- 宫格 -->
      <van-grid class="nav-grid" :column-num="2" clickable>
        <van-grid-item text="收藏">
          <i slot="icon" class="iconfont icon-shoucang"></i>
          <span class="text" slot="text">收藏</span>
        </van-grid-item>
        <van-grid-item text="文字">
          <i slot="icon" class="iconfont icon-lishi"></i>
          <span class="text" slot="text">历史</span>
        </van-grid-item>
      </van-grid>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell
        @click="onLogout"
        v-if="user"
        class="logout-cell"
        title="退出登录"
        center
      />
    </div>
    <div v-else class="my-container">
      <!-- 未登录 -->
      <div class="header">
        <img class="mobile-img" src="~@/assets/mobile.png" />
        <div @click="$router.push('/login')">登录 / 注册</div>
      </div>
      <div class="grid-nav"></div>
    </div>
  </div>
</template>

<script>
import types from '@/store/types'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      userinfo: {}
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  watch: {},
  created () {
    if (!this.$store.state.user) return
    this.getinfo()
  },
  mounted () {},
  methods: {
    getinfo () {
      if (this.user) {
        this.apis.user.getUserInfo()
          .then(res => {
            // console.log(res)
            this.userinfo = res.data.data
          }).catch((err) => {
            this.$toast('获取数据失败，请稍后重试', err)
          })
      }
    },
    onLogout () {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog
        .confirm({
          title: '确认退出吗？'
        })
        .then(() => {
          // on confirm
          // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
          this.$store.commit(types.mutations.setUser, null)
        })
        .catch(() => {
          // on cancel
          console.log('取消执行这里')
        })
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  > .header {
    height: 361px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 132px;
      height: 132px;
    }
  }
}
.header {
  width: 750px;
  height: 401px;
  background: url("~@/assets/banner.png");
  background-size: cover;
}
.userInfo {
  .base {
    height: 231px;
    padding: 76px 32px 23px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        border: 2px solid #fff;
      }
      .name {
        font-size: 29px;
        margin-left: 22px;
      }
    }
  }
  .data {
    display: flex;
    justify-content: space-around;
    .data-item {
      height: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #fff;
      span:nth-child(1) {
        font-size: 36px;
        margin-bottom: 15px;
      }
      span:nth-child(2) {
        font-size: 23px;
      }
    }
  }
  .nav-grid {
    background: #fff;
    .toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    .text {
      color: #000;
      margin-top: 8px;
      font-size: 28px;
    }
  }
  .logout-cell {
    height: 100px;
    text-align: center;
    color: #eb5253;
    margin: 10px 0;
    font-size: 30px;
  }
}
</style>
