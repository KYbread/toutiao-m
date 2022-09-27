<template>
    <van-button
      v-if="!isFollowed"
      @click="followingsAuthor(aut_id)"
      :loading="loading"
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      >关注</van-button
    >
    <van-button
      v-else
      @click="deleteAuthor(aut_id)"
      :loading="loading"
      class="follow-btn"
      round
      size="small"
      >已关注</van-button
    >
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'FollowUser',
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    aut_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  // 父组件在子组件上使用v-model绑定的属性和事件
  model: {
    prop: 'isFollowed', // 默认值为 value
    event: 'changeIsFollowed' // 默认值为 input
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    followingsAuthor (id) {
      this.loading = true
      this.apis.aritcle.followingsAuthorAPI(id).then((res) => {
        // console.log('已关注')
        // 请求成功之后给articleList.aut_id取反，失败则提示
        // 这里如果不传改变后的this.isFollowed值，父组件就没法用v-model语法糖
        this.$emit('changeIsFollowed', !this.isFollowed)
      }, (err) => {
        let message = '操作失败，请重试！'
        if (err.response && err.response.status === 400) {
          message = '用户不能关注自己'
          Toast(message)
        }
      }).finally(() => {
        this.loading = false
      }
      )
    },

    deleteAuthor (id) {
      this.loading = true
      this.apis.aritcle.deleteAuthorAPI(id).then((res) => {
        // console.log('已取关')
        // 子传父
        this.$emit('changeIsFollowed', !this.isFollowed)
      }, () => {
        Toast('发生错误，请稍后重试')
      }).finally(
        this.loading = false
      )
    }
  }
}
</script>

<style>
</style>
