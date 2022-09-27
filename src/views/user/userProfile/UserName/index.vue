<template>
  <div>
    <van-nav-bar
  title="昵称"
  left-text="取消"
  right-text="完成"
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
<van-field
  v-model.trim="value"
  rows="2"
  autosize
  type="textarea"
  maxlength="15"
  placeholder="请输入昵称"
  show-word-limit
/>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  data () {
    return {
      value: this.message
    }
  },
  props: ['message'],
  methods: {
    onClickLeft () {
      this.$emit('update-username', null)
      Toast('取消')
    },
    onClickRight () {
      if (!this.value) {
        Toast.fail('内容不能为空')
        return
      }
      this.$emit('update-username', this.value)
    }

  }
}
</script>

<style scoped lang="less">
 .van-nav-bar{
  background-color: #fff;
 /deep/ .van-nav-bar__title{
    color:black
  }
}
</style>
