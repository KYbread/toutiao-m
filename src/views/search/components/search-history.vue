<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span v-if="isDeletehistoryList"
      @click="$emit('delHistory')"
      >全部删除</span> &nbsp;
      <span v-if="isDeletehistoryList"
      @click="isDeletehistoryList=!isDeletehistoryList">完成</span>
      <van-icon v-else name="delete" @click="isDeletehistoryList=!isDeletehistoryList" />
    </van-cell>
    <van-cell v-for="(item,index) in historyList" :key="index"
     :title="item"
     @click="$emit('removeHistory',index,isDeletehistoryList)"
     >
      <van-icon name="close" v-show="isDeletehistoryList" @click="$emit('removeHistory',index,isDeletehistoryList)" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    historyList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeletehistoryList: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
