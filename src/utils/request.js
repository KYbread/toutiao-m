// 请求模块
import axios from 'axios'
import store from '@/store'
import types from '@/store/types'
import JSONBig from 'json-bigint'
import { refreshToken } from '@/api/user'
import { Toast } from 'vant'
import router from '@/router'
const request = axios.create({
  // 配置请求的基准URL地址
  baseURL: 'http://geek.itheima.net',
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
// 1   token过期，会返回401错误，判断是不是401
// 2.  在401错误err回调里面发新的请求，用refreshtoken更新token
// 3.  判断一下refreshtoken请求，成功了就在需要token的地方重新用token登录，失败了就报错500,就跳回登录页面然后提示

// 请求拦截器
// 在所有请求发出去之前，都会先进入这个拦截器执行
// 将拦截器执行的返回值作为最终的请求配置作为参数，再去发送请求
// 千万不要忘了，写return，如果不写return，那么就相当于把请求配置改成了underfined
request.interceptors.request.use((reqConfig) => {
  // 我们就可以在这里对请求配置做点手脚
  // 当有token的时候,我们就加到请求头里
  if (store.state.user?.token) {
    // reqConfig.headers.Authorization =
    //   'Bearer ' + store.state.user?.token
    if (reqConfig.isRefreshToken) {
      reqConfig.headers.Authorization = `Bearer ${store.state.user?.refresh_token}`
    } else {
      reqConfig.headers.Authorization = `Bearer ${store.state.user?.token}`
    }
  }
  // console.log(reqConfig)
  return reqConfig
})

// 响应拦截器
// 添加一个响应拦截器，判断请求是否是因为token失效导致的
// axios基于Promise,又因，Promise实例的.then是有默认值的
// 在又因，Promise对象里传underfined，相当于写(res)=>{return res}
// 1.发起请求 2.进入请求拦截器 3.请求成功或失败 4。进入相应拦截器 5.相应成功或失败
request.interceptors.response.use(undefined, (err) => {
  if (err.response.status === 401) {
    // 401：token失效
    // 先去刷新token
    return refreshToken().then((res) => {
      // 刷新成功，更新vuex和本地存储中的token
      store.commit(types.mutations.setUser, { ...store.state.user, token: res.data.data.token })
      // console.log(res)
      // 此时，token 就是有效的了，那么，就可以去发上一次失败的请求了
      // 重新发送上一次失败的请求
      console.log(err)
      // 重新发送上一次失败的请求
      return request(err.config)
    }, () => {
      Toast.fail('登录过期，请重新登录')
      // 清空token数据
      store.commit(types.mutations.changeUserToken, null)
      router.push({ name: 'login' })
      return new Promise(() => {}) // 进入这个错误回调后，return 状态一直是pedding的Promise，就不会进入后面的.then
    })
  }
})

export default request
