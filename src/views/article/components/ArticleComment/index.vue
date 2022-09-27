<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error="error"
      error-text="加载失败，请点击重试"
      :immediate-check="false"
      @load="onLoad"
    >
      <CommentItem
      v-for="obj in list"
      :key="obj.com_id"
      :obj="obj"
      @update-commit="$emit('update-commit',$event)"
      >
      </CommentItem>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
     <div class="reply-bottom">
          <van-button class="post-btn" type="default" round size="small"
          @click="show=true"
            >写评论
            </van-button
          >
          </div>
    <!-- /发布评论 -->

            <!-- 文章回复 -->
        <van-popup
          v-model="show"
          position="bottom"
        >
        <!-- 需要传入两个数据，回复目标的id，文章id -->
        <CommentPost
        :articleId="this.articleId"
        :targetId="this.targetId"
         @update-newcomment="onUpdateNewcomment"
        />
        </van-popup>
        <!-- 文章回复 -->
  </div>
</template>

<script>
import { Toast } from 'vant'
import CommentItem from '../comment-item'
import CommentPost from '@/components/CommentPost'
export default {
  name: 'ArticleComment',
  components: {
    CommentItem, CommentPost
  },
  props: {
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    },
    articleId: {
      type: [Number, String]
    },
    targetId: {
      type: [Number, String],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: undefined,
      error: false,
      value: '',
      show: false
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    onUpdateNewcomment (newComment) {
      // console.log(this.commentList, newComment)
      // 关闭弹出层
      this.show = false
      Toast.success('发表评论成功！')
      // 将发布内容添加到评论列表顶部
      // eslint-disable-next-line vue/no-mutating-props
      this.list.unshift(newComment)
    },
    // sendComment () {
    //   if (!this.value) return Toast('发布内容不能为空！')
    //   this.loading = true
    //   // this.$emit('update-reply-comment', data)
    //   // 发起请求，添加评论
    //   this.apis.comment.PostCommentAPI({
    //     target: this.targetId,
    //     content: this.value,
    //     art_id: this.articleId
    //   }).then((res) => {
    //     this.loading = false
    //     // console.log(res)
    //     // 清空文本框
    //     this.message = ''
    //     Toast.success('发表评论成功！')
    //     // eslint-disable-next-line vue/no-mutating-props
    //     this.list.unshift({ ...res.data.data.new_obj })
    //   }, () => {
    //     this.loading = false
    //     Toast.fail('评论发送失败，请重试！')
    //   })
    // },
    onLoad () {
      this.loading = true
      // 异步更新数据
      this.apis.comment.getCommentsAPI({
        type: this.type,
        source: this.targetId,
        offset: this.offset,
        limit: 10
      }).then((res) => {
        // console.log(res)
        // eslint-disable-next-line vue/no-mutating-props
        this.list.unshift(...res.data.data.results)
        this.offset = res.data.data.last_id
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (res.data.data.end_id === res.data.data.last_id) {
          this.finished = true
        }
      }, () => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
