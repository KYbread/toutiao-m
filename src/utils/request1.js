// 请求模块
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
const request1 = axios.create({
  // 配置请求的基准URL地址
  baseURL: 'https://toutiao.itheima.net/',
  // 自定义后端返回的原始数据
  // data:后端返回的原始数据
  transformResponse: [function (data) {
    try {
      // 拿到data之后判断是不是JSON格式的字符串
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

// 请求拦截器
// 在所有请求发出去之前，都会先进入这个拦截器执行
// 将拦截器执行的返回值作为最终的请求配置作为参数，再去发送请求
// 千万不要忘了，写return，如果不写return，那么就相当于把请求配置改成了underfined
request1.interceptors.request.use((reqConfig) => {
  // 我们就可以在这里对请求配置做点手脚
  // 当有token的时候,我们就加到请求头里
  if (store.state.user?.token) {
    reqConfig.headers.Authorization =
      'Bearer ' + store.state.user?.token
  }
  // console.log(reqConfig)
  return reqConfig
})

// 响应拦截器

export default request1
