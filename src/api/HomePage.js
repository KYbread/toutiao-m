import request from '@/utils/request'

// 获取-我的频道列表
export const getChannelList = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// 获取-全部频道列表
export const getAllChannelList = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 设置-频道列表
export const setMyChannelList = (channels) => {
  return request({
    method: 'PUT',
    url: '/v1_0/user/channels',
    data: {
      channels
    }
  })
}

// 删除-频道列表
export const DelMyChannelList = (id) => {
  return request({
    method: 'DELETE',
    url: '/v1_0/user/channels/' + id
  })
}

// 获取-文章列表
export const getAriticlesList = (params) => {
  // console.log(1, params)// 第一次
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  }).then(res => {
    // 过滤无效图片
    // 先映射所有的文章对象
    res.data.data.results.map(v => {
      // 判断是否有图片
      if (v.cover.type !== 0) {
        // 如果有，则将满足图片链接地址条件的过滤出来，重新赋值给 文章对象的 images 数组
        v.cover.images = v.cover.images.filter(v2 => v2.startsWith('http'))
        v.cover.images = v.cover.images.map(v2 => v2.replace('http://localhost:8000', request.defaults.baseURL))
      }
      // 返回这个文章对象
      return v
    })
    // /过滤无效图片

    return res
  })
}
