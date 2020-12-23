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
    method: 'GEffT',
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
export const getArticleById = id => { // 获取文章详情
  return request({
    method: 'GET',
    url: `/v1_0/articles/${id}` // 通过默认转化的数据本来需要调用toString方法，但是这里有字符串拼接，所以不用
  })
}
export const addUser = id => { // 关注用户
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: id
    }
  })
}

export const cnelUser = id => { // 取消关注用户
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${id}`
  })
}
export const Collected = id => { // 收藏文章
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target: id
    }
  })
}
export const UnCollected = id => { // 取消收藏文章
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${id}`
  })
}
export const likeArticle = id => { // 点赞文章
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: id
    }
  })
}
export const UnlikeArticle = id => { // 取消点赞文章
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${id}`
  })
}
