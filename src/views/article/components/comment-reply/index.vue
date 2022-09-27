<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="comment.reply_count?`${comment.reply_count}条回复`:'暂无回复'">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('click-close')"
      />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <CommentItem :obj="comment"/>
    <!-- /当前评论项 -->

    <van-cell title="所有回复" />

    <!-- 评论的回复列表 -->
    <!-- 需要传入两个数据，回复目标的id，文章id -->
    <ArticleComment
        type="c"
        :targetId="id"
        :articleId="articleId"
        @update-commit="comment.reply_count++"
    />
        <!-- @update-reply-comment="onUpdateReplyCommit" -->
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <!-- /底部 -->
  </div>
</template>

<script>
import ArticleComment from '../ArticleComment'
import CommentItem from '../comment-item'
export default {
  name: 'CommentReply',
  components: {
    CommentItem, ArticleComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      id: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.id = this.comment.com_id
  },
  mounted () {},
  methods: {
    changeReplyId (currentComment) {
      console.log(currentComment)
      // 修改回复目标id
      this.id = currentComment.com_id
    }
  }
}
</script>

<style scoped>

</style>
