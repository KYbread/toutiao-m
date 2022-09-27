<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleList.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleList.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleList.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleList.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleList.pubdate | relativeTime }}
          </div>
          <FollowUser
            :aut_id="articleList.aut_id"
            v-model="articleList.is_followed"
          />
          <!-- <van-button
            v-if="!articleList.is_followed"
            @click="followingsAuthor(articleList.aut_id)"
            :loading='followLoading'
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
          >关注</van-button>
          <van-button
            v-else
            @click="deleteAuthor(articleList.aut_id)"
            :loading='followLoading'
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          ref="article-content"
          v-html="articleList.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论区域 -->
        <ArticleComment
        :list="commentList"
        :targetId="articleList.art_id"
        @update-commit="onUpdateCommit"
         />
        <!-- 评论区域 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small"
          @click="show=true"
            >写评论</van-button
          >
          <van-icon
            name="comment-o"
            :badge="articleList.comm_count"
            color="#777"
          />
          <!-- 收藏组件 传入文章id -->
          <CollectArticle
            :is_collected="articleList.is_collected"
            @update-collections="changeCollections"
          />
          <LikeArticle
            :like_count="articleList.like_count"
            :is_liking="undefined"
            @update-like_count="changeLikeCount"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 文章回复 -->
        <van-popup
          v-model="show"
          position="bottom"
        >
        <!-- 需要传入两个数据，回复目标的id，文章id -->
        <CommentPost
        :targetId="articleList.art_id"
        @update-newcomment="onUpdateNewcomment"
        />
        </van-popup>
        <!-- 文章回复 -->
        <!-- 评论回复 -->
                <van-popup
          v-model="isReplyShow"
          position="bottom"
          style="height:100%;"
        >
        <!-- 需要传入两个数据，回复目标的id，文章id,回复目标是评论，这里没有 -->
          <CommentReply
          v-if="isReplyShow"
          :comment="replyComment"
          :articleId="articleList.art_id"
          @click-close="isReplyShow=false"
           />
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="status === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div
        v-else-if="
          status !== 404 &&
          !status.toString().startsWith(2) &&
          !status.toString().startsWith(0)
        "
        class="error-wrap"
      >
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { ImagePreview, Toast } from 'vant'
import FollowUser from '@/components/followUser'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import ArticleComment from './components/ArticleComment'
import CommentPost from '@/components/CommentPost'
import CommentReply from './components/comment-reply'

export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    ArticleComment,
    CommentPost,
    CommentReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isReplyShow: false,
      show: false,
      articleList: {},
      loading: true, // 加载中的loading状态
      status: 0, // 失败状态码
      commentList: [],
      replyComment: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleList()
  },
  mounted () {},
  methods: {
    onUpdateCommit (comment) {
      // 显示评论回复弹出层
      this.isReplyShow = true
      this.replyComment = comment
    },
    onUpdateNewcomment (newComment) {
      // console.log(this.commentList, newComment)
      // 关闭弹出层
      // 提醒父组件回复数量变了
      this.$emit('update-newcomment')
      this.show = false
      Toast.success('发表评论成功！')
      // 将发布内容添加到评论列表顶部
      this.commentList.unshift(newComment)
    },
    changeLikeCount (likeCount) {
      if (!likeCount) {
        // 点赞
        // 发送点赞请求
        this.apis.aritcle.articleLikingsAPI(this.articleList.art_id).then(
          () => {
            // 发送成功
            console.log(this.articleList.like_count)
            this.articleList.like_count++
            console.log(this.articleList.like_count)
            Toast.success('点赞成功！')
          },
          () => {
            Toast.fail('点赞失败，请重试！')
          }
        )
      } else {
        // 点击取消点赞
        this.apis.aritcle.cancelLikingsAPI(this.articleList.art_id).then(
          () => {
            // 发送成功
            console.log(this.articleList.like_count)
            this.articleList.like_count--
            console.log(this.articleList.like_count)
            Toast.success('取消点赞成功！')
          },
          () => {
            Toast.fail('取消点赞失败，请重试！')
          }
        )
      }
    },
    changeCollections (isCollected) {
      // 点击收藏
      if (isCollected) {
        // 发送收藏请求
        this.apis.aritcle.collectionsAPI(this.articleList.art_id).then(
          () => {
            // 发送成功
            this.articleList.is_collected = isCollected
            Toast.success('收藏成功！')
          },
          () => {
            Toast.fail('收藏失败，请重试！')
          }
        )
      } else {
        // 点击取消收藏
        this.apis.aritcle.cancelCollectionsAPI(this.articleList.art_id).then(
          () => {
            // 发送成功
            this.articleList.is_collected = isCollected
            Toast.success('取消收藏成功！')
          },
          () => {
            Toast.fail('取消收藏失败，请重试！')
          }
        )
      }
    },
    PreviewImage () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imagesURL = []
      imgs.forEach((img, index) => {
        imagesURL.push(img.src)
        img.addEventListener('click', function () {
          ImagePreview({
            images: imagesURL,
            startPosition: index,
            onClose () {
              Toast('关闭')
            }
          })
        })
      })
    },
    getArticleList () {
      this.apis.aritcle
        .getArticleListAPI(this.articleId)
        .then(
          (res) => {
            // console.log(res)
            this.articleList = res.data.data
            setTimeout(() => {
              this.PreviewImage()
            }, 0)
            // 这里和下面的this.loading = false不能提取到公共部分
            // ，因为同步代码会先执行，导致瞬间loading改为true
            // 此时请求还没发完，页面会闪一下加载失败
            // this.loading = false
          },
          (err) => {
            if (err.response && err.status.status === 404) {
              this.status = 404
              console.log(err)
              // this.loading = false
            }
          }
        )
        .finally(() => {
          this.loading = false
        })
      // 无论成功失败都关闭loading
    }
  }
}
</script>

<style scoped lang="less">
@import url("./github-markdown.css");
.article-container {
  .van-nav-bar{
    z-index: 0;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
 /deep/.van-button--primary{
.van-button__text{
    width: 80px;
  }
 }
}
</style>
