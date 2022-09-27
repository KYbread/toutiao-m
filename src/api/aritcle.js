import request from '@/utils/request'
// import request1 from '@/utils/request1'

// 获取-文章详情
export const getArticleListAPI = (id) => {
  // console.log(q)
  return request({
    method: 'GET',
    url: '/v1_0/articles/' + id
  })
}

// 文章-关注作者
export const followingsAuthorAPI = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 文章-取关作者
export const deleteAuthorAPI = (target) => {
  return request({
    method: 'DELETE',
    url: '/v1_0/user/followings/' + target

  })
}

// 文章-收藏
export const collectionsAPI = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 文章-取消收藏
export const cancelCollectionsAPI = (target) => {
  return request({
    method: 'DELETE',
    url: '/v1_0/article/collections/' + target
  })
}

// 文章-点赞
export const articleLikingsAPI = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 文章-取消点赞
export const cancelLikingsAPI = (target) => {
  return request({
    method: 'DELETE',
    url: '/v1_0/article/likings/' + target
  })
}
