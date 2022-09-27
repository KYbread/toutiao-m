<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- 文章列表组件 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="加载失败，请点击重试"
        @load="onLoad"
      >
        <van-cell v-for="obj in list"
        :key="obj.art_id"
        :to="{name:'article',params:{articleId:obj.art_id}}"
        >
          <h3 class="van-ellipsis">{{ obj.title }}</h3>
          <div class="img_box" v-if="obj.cover.type === 0"></div>
          <div class="img_box" v-if="obj.cover.type === 1">
            <img :src="obj.cover.images[0]" class="w100" />
          </div>
          <div v-if="obj.cover.type === 3" class="img_box">
            <!-- 有可能出现重复的图片，导致url重复，所以key不能用url -->
            <img
              v-for="(url, i) in obj.cover.images"
              :key="i"
              :src="url"
              class="w33"
            />
          </div>
          <!---->
          <div class="info_box">
            <span>{{ obj.aut_name }}</span>
            <span>{{ obj.comm_count }}评论</span>
            <span>{{ obj.pubdate | relativeTime }}</span>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  components: {},
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      refreshing: false,
      error: false,
      timestamp: +new Date() // 默认时间戳
    }
  },
  computed: {
    getAriticlesListParams () {
      return {
        channel_id: this.id,
        timestamp: this.timestamp
      }
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 初始化或滚动到底部的时候会触发调用 onLoad
    async onLoad () {
      // 如果刷新，将loading改为true，这样加载完成后，loading会变成false
      // 就会触发van-list组件的check事件，检查是否填满容器
      // 也可以手动通过ref选中这个DOM对象，调用check方法
      this.loading = true
      // console.log('onLoad', this.$store.state.AriticlesListParams)
      // 1. 请求获取数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 2. 把请求结果数据放到 list 数组中
      if (this.refreshing) {
        this.list = []
        this.refreshing = false
      }
      const res = await this.apis.HomePage.getAriticlesList(
        this.$store.state.AriticlesListParams
      )
      // console.log(res)
      this.list.push(...res.data.data.results)
      // console.log(this.timestamp) // 上一次的时间戳
      this.$store.state.AriticlesListParams.timestamp =
        res.data.data.pre_timestamp
      // console.log(this.timestamp) // 接收传回来的时间戳

      // 3. 本次数据加载结束之后要把加载状态设置为结束
      //     loading 关闭以后才能触发下一次的加载更多
      this.loading = false

      // 4. 判断数据是否全部加载完成
      if (this.list.length >= 40) {
        // 如果没有数据了，把 finished 设置为 true，之后不再触发加载更多
        this.finished = true
      }
    },
    async onRefresh () {
      try {
        // 清空列表数据
        this.list = []
        this.finished = false

        // 重新加载数据
        const res = await this.apis.HomePage.getAriticlesList(
          this.$store.state.AriticlesListParams
        )
        // console.log(res)
        this.list = res.data.data.results
        console.log(this.timestamp) // 上一次的时间戳
        this.$store.state.AriticlesListParams.timestamp =
        res.data.data.pre_timestamp
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true
        this.onLoad()
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  height: calc(100vh - 180px - 100px);
  overflow: auto;
}
.article_item {
  padding: 0 10px;
}
.article_item .img_box {
  display: flex;
  justify-content: space-between;
}
.img_box .w33 {
  width: 33%;
  height: 180px;
  display: inline-block;
}
.img_box .w100 {
  width: 100%;
  height: 360px;
  display: inline-block;
}
h3 {
  font-weight: normal;
  line-height: 2;
}
.info_box {
  color: #999;
  line-height: 2;
  position: relative;
  font-size: 24px;
}
.info_box span {
  padding-right: 10px;
}
.info_box span.close {
  border: 1px solid #ddd;
  border-radius: 2px;
  line-height: 15px;
  height: 12px;
  width: 16px;
  text-align: center;
  padding-right: 0;
  font-size: 8px;
  position: absolute;
  right: 0;
  top: 7px;
}
</style>
