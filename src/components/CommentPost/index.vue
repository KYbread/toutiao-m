<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button
      type="primary"
      size="small"
      :disabled='!message.length'
      @click="postComments(targetId,articleId)"
    >发布</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'CommentPost',
  components: {},
  // 评论回复组件需接收参数：1.评论目标id 2.文章id
  props: {
    targetId: {
      type: [String, Number],
      required: true
    },
    articleId: {
      type: [String, Number],
      default: null
    }

  },
  data () {
    return {
      message: '',
      newComment: {}
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    postComments (targetId, articleId) {
      this.apis.comment.PostCommentAPI({
        target: targetId,
        content: this.message,
        art_id: articleId
      }).then((res) => {
        console.log(res)
        // 清空文本框
        this.message = ''
        // 把更新的评论数据传给父组件
        this.$emit('update-newcomment', { ...res.data.data.new_obj })
      }, () => {
        Toast.fail('评论发布失败，请重试！')
      })
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
</style>
