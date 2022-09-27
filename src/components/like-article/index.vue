<template>
<div class='good-job' v-if="is_liking!==undefined">
    <van-icon
    :color="is_liking ? 'red' : ''"
    :name="is_liking?'good-job':'good-job-o'"
    @click="$emit('update-like_count',like_count)"
  /> <span>{{like_count}}</span>
</div>

  <div class='good-job' v-else>
  <van-icon
    :color="like_count === 1 ? 'red' : ''"
    :name="like_count === 1?'good-job':'good-job-o'"
    @click="$emit('update-like_count',like_count)"
  />
</div>
</template>

<script>
export default {
  name: 'LikeArticle',
  data () {
    return {

    }
  },

  props: {
    like_count: {
      type: [Number]
    },
    is_liking: {
      type: [Boolean]
    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped lang='less'>

</style>
