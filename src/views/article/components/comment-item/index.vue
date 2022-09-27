<template>
  <van-cell class="comment-item">
       <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="obj.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{obj.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{obj.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{obj.pubdate | relativeTime}}</span>
            <van-button
            size="mini"
            type="default"
            @click="$emit('update-commit',obj)"
            >回复{{obj.reply_count}} </van-button>
          </p>
        </div>
        <LikeArticle :like_count="obj.like_count" :is_liking="obj.is_liking"
         @update-like_count="changeLikeCount($event,obj)"
         />
  </van-cell>
</template>

<script>
import LikeArticle from '@/components/like-article'
import { Toast } from 'vant'
export default {
  name: 'CommentItem',
  components: {
    LikeArticle
  },
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    changeLikeCount (likeCount, obj) {
      // console.log(obj.is_liking)
      if (!obj.is_liking) {
        // 点赞
        // 发送点赞请求
        this.apis.comment.commentLikingsAPI(obj.com_id)
          .then(() => {
          // 发送成功,找到list数组里对应的对象的id
            obj.is_liking = true
            obj.like_count++
            Toast.success('点赞成功！')
          }, () => {
            Toast.fail('点赞失败，请重试！')
          })
      } else {
      // 点击取消点赞
        this.apis.comment.cancelcommentLikingsAPI(obj.com_id)
          .then(() => {
          // 发送成功
            obj.is_liking = false
            obj.like_count--
            Toast.success('取消点赞成功！')
          }, () => {
            Toast.fail('取消点赞失败，请重试！')
          })
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>
