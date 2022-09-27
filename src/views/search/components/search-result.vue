<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <van-cell v-for="obj in resultList"
      :key="obj.art_id"
      :to="'/article/'+obj.art_id"
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
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      resultList: [],
      total_count: 0,
      page: 1,
      loading: false,
      finished: false,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        // console.log(this.value)
        if (!this.value.trim()) return this.$toast('搜索内容不能为空')
        const res = await this.apis.search.getResult({
          page: this.page,
          per_page: 10,
          q: this.value
        })
        // console.log(res)
        // 模拟失败情况
        // if (Math.random() > 0.5) {
        //   throw new Error('1')
        // }
        this.resultList = [...this.resultList, ...res.data.data.results]
        this.total_count = res.data.data.total_count
        this.page++
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.resultList.length >= this.total_count) {
          this.finished = true
        }
      } catch (err) {
        // console.log(err)
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-result {
  height: calc(100vh - 108px);
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
