<template>
  <van-icon
    :color="is_collected ? '#ffa500' : ''"
    :name="is_collected?'star':'star-o'"
    @click="$emit('update-collections',!is_collected)"
  />
</template>

<script>
export default {
  name: 'CollectArticle',
  props: {
    is_collected: {
      type: Boolean,
      required: true
    }
  }
}
</script>
