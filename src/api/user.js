import request from '@/utils/request'
export const login = data => { // 按需导出可以导出多次
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
export const sendSms = data => { // 验证码
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${data}`
  })
}
export const getUserInfo = () => { // 获取用户数据
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}
export const getUserChannels = () => { // 获取用户频道数据，无token会返回默认的全部频道列表
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
