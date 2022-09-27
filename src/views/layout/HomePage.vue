<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!--
通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签
通过animated属性可以开启切换标签内容时的转场动画
通过swipeable属性可以开启滑动切换标签页
-->
<!-- v-model 是v-on:input 和 v-bind:value 的组合 -->
    <van-tabs class="channel-tabs" v-model="currentId" animated swipeable sticky offset-top='46px' @click="onChange" >
      <van-tab v-for="obj in ChannelList" :key="obj.id" :name="obj.id" :title="obj.name" >
        <!-- 文章列表 -->
        <ArticleList :id='obj.id' />
        <!-- 文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="showPopup">
        <i class="iconfont icon-gengduo" ></i>
      </div>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
<van-popup
  v-model="show"
  overlay
  closeable
  close-icon-position="top-left"
  position="bottom"
  :style="{ height: '100%' }"
>
<ChannelEdit :myChannels="ChannelList" :currentId="currentId"
  @changeCurrentId="changeId"
/>
</van-popup>
    <!-- 频道编辑弹出层 -->
  </div>
</template>

<script>
import ArticleList from '@/views/layout/HomePage/components/article-list.vue'
import ChannelEdit from './HomePage/components/channel-edit.vue'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      currentId: 0,
      ChannelList: [],
      show: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getChannel()
  },
  mounted () {},
  methods: {
    changeId (id) {
      this.currentId = id
    },
    showPopup () {
      this.show = true
    },
    onChange (id) {
      this.currentId = id
      console.log(this.currentId)
    },
    getChannel () {
      if (this.$store.state.user) {
        this.apis.HomePage.getChannelList()
          .then(
            res => {
              console.log(res)
              this.ChannelList = res.data.data.channels
            }
          ).catch((err) => {
            console.log(err)
          })
      } else {
        this.ChannelList = JSON.parse(localStorage.getItem('myChannels'))
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
    padding-bottom: 100px;
    // overflow: hidden;

    .channel-tabs{
      position: relative;
      margin-top: 92px;

    }
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  .placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
}
/deep/ .channel-tabs {
  .van-tab {
    border-right: 1px solid #EDEFF3;
    min-width: 200px;
    height: 80px;
    .van-tab__text {
      font-size: 27px;
      color: #777777;
    }
  }

  .van-tab--active .van-tab__text{
    color: #333 !important;
  }
  .van-tabs__line {
    width:31px !important;
    height:6px;
    background:rgba(50,150,250,1);
    border-radius:3px;
    bottom: 8px;
  }
  .van-tabs__nav {
    padding: 0;
  }
  }

</style>
