<template>
  <div class="search-suggestion">
    <van-cell v-for="(item,index) in searchList" :key="index"
     icon="search">
     <div slot="title"
     v-html="highLight(item)"
     @click="$emit('changeValue',item)"
     ></div>
     </van-cell>
  </div>
</template>

<script>
// 按需加载
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      searchList: []
    }
  },
  computed: {},
  watch: {
    value: {
      handler: debounce(async function (value) {
        this.getSearchList(value)
      }, 300),
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    highLight (str) {
      // console.log(str)
      if (!str) return
      if (str.includes(this.value)) {
        const reg = new RegExp(this.value, 'ig')
        return str.replace(reg, `<span class='active'>${this.value}</span>`)
      } else {
        return str
      }
    },
    getSearchList () {
      // console.log(this)
      // 发起请求
      if (!this.value.trim()) return
      this.apis.search.getSuggestion(this.value).then((res) => {
        // console.log(res)
        this.searchList = res.data.data.options
      }).catch((err) => {
        this.$toast(err)
      })
    }
  }
}
</script>

<style scoped lang="less">
/deep/ span.active{
  color:#3296fa;
}
</style>
