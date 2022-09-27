import request1 from '@/utils/request1'

// 获取-搜索联想建议
export const getSuggestion = (q) => {
  // console.log(q)
  return request1({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 获取-搜索结果
export const getResult = (params) => {
  return request1({
    method: 'GET',
    url: '/v1_0/search',
    params
  }).then(res => {
    // 过滤无效图片
    // 先映射所有的文章对象
    res.data.data.results.map(v => {
      // 判断是否有图片
      if (v.cover.type !== 0) {
        // 如果有，则将满足图片链接地址条件的过滤出来，重新赋值给 文章对象的 images 数组
        v.cover.images = v.cover.images.filter(v2 => v2.startsWith('http')).map(v3 => v3.replace('http://localhost:8000', 'http://geek.itheima.net'))
      }
      // 返回这个文章对象
      return v
    })
    // /过滤无效图片

    return res
  })
}
