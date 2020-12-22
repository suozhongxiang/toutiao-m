import request from '@/utils/request'

export const suggestion = data => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q: data
    }
  })
}

export const rearchResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
export const searchHistory = () => {
  return request({
    method: 'GET',
    url: '/v1_0/search/histories'
  })
}
