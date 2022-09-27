
import request from '@/utils/request'

// 登录接口封装
export const login = (data) => {
  // console.log(data)
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
// 验证码接口封装
export const sendCode = (mobile) => {
  return request({
    method: 'GET',
    url: '/v1_0/sms/codes/' + mobile
  })
}

// 获取-用户详细资料
// 函数封装时,少传参数，能拿到数据尽量自己拿
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: 'Bearer ' + store.state.user.token
    // }
  })
}

// 刷新token
export const refreshToken = () => {
  return request({
    method: 'PUT',
    url: '/v1_0/authorizations',
    isRefreshToken: true // 这不是标准的axios配置，而是自定义配置
  })
}

// 获取-用户详细资料
// 函数封装时,少传参数，能拿到数据尽量自己拿
export const getUserProfileAPI = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
    // headers: {
    //   Authorization: 'Bearer ' + store.state.user.token
    // }
  })
}

// 更新-用户个人简介
export const updateUserProfileAPI = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
    // headers: {
    //   Authorization: 'Bearer ' + store.state.user.token
    // }
  })
}
