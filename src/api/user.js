import request from '@/utils/request'
export const login = data => { // 按需导出可以导出多次
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
export const sendSms = data => { // 验证码
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${data}`
  })
}
