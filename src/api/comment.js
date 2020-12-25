import request from '@/utils/request'
export function addCommentLike (commentId) { // 对评论或评论回复点赞
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}
export function deleteCommentLike (commentId) { // 取消对评论或评论回复点赞
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${commentId}`
  })
}
export function addcomments (data) { // 取消对评论或评论回复点赞
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
