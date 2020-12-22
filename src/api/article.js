import request from '@/utils/request'
export const getList = params => {
  return request({ // 获取频道列表下的新闻
    method: 'GET',
    url: '/v1_1/articles',
    params
  })
}
export const getAllchannels = () => {
  return request({ // 获取频道列表下的新闻
    method: 'GET',
    url: '/v1_0/channels'
  })
}
export const setChannle = val => {
  return request({ // 获取频道列表下的新闻
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [val]
    }
  })
}
export const delChannel = id => {
  return request({ // 获取频道列表下的新闻
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })
}
