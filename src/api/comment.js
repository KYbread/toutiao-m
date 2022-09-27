import request from '@/utils/request'

// 获取-文章评论列表
export const getCommentsAPI = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

// 评论-点赞
export const commentLikingsAPI = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 评论-取消点赞
export const cancelcommentLikingsAPI = (target) => {
  return request({
    method: 'DELETE',
    url: '/v1_0/comment/likings/' + target
  })
}

// 增加-文章评论
export const PostCommentAPI = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
