<template>
  <div class="search-container">
        <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search ="onSearch"
        @cancel='onCancel'
        @focus="resultShow=false"
      />
    </form>
<SearchResult v-if="resultShow" :value='value'/>
<SearchSuggestion v-else-if="value" :value='value'
 @changeValue='onSearch'
 />
<SearchHistory v-else :historyList='historyList'
 @removeHistory='removehistoryList'
 @delHistory='deleteHistory'
 />
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
// eslint-disable-next-line no-unused-vars
export default {
  name: 'SearchPage',
  components: {
    SearchHistory, SearchSuggestion, SearchResult
  },
  props: {},
  data () {
    return {
      value: '',
      resultShow: false, // 控制搜索结果的显示
      searchList: [],
      historyList: JSON.parse(localStorage.getItem('historyList')) || [],
      resultList: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    deleteHistory () {
      this.historyList = []
      localStorage.removeItem('historyList')
    },
    removehistoryList (index, isDeletehistoryList) {
      if (isDeletehistoryList) {
        this.historyList.splice(index, 1)
        localStorage.setItem('historyList', JSON.stringify(this.historyList))
      } else {
        this.onSearch(this.historyList[index])
      }
    },
    onSearch (value) {
      // console.log(value)
      // 每次显示搜索结果前，将搜索内容存到历史记录里
      const i = this.historyList.findIndex(item => item === value)
      if (i !== -1) {
        this.historyList.splice(i, 1)
      }
      this.historyList.unshift(value)
      localStorage.setItem('historyList', JSON.stringify(this.historyList))
      this.value = value
      this.resultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped></style>
