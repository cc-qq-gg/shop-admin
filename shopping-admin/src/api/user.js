import request from '@/utils/request.js'
// export const getUserList = ({ pagesize = 4, pagenum = 1 }) => request({
//   method: 'get',
//   url: '/login',
//   parmas: {
//     pagenum,
//     pagesize
//   }
// }).then(res => res.data)
// 已经确认过代码完全一致，但是结果却出现意外结果，防止事件浪费记得及时重启
export const addUser = (data) => request({
  method: 'post',
  url: '/users',
  data
}).then(res => res.data)
// 获取列表
export const getUserList = ({
  pagenum = 1,
  pagesize = 4,
  query = ''
}) => request({
  method: 'get',
  url: '/users',
  params: { // 传递 GET 参数
    pagenum,
    pagesize,
    query
  }
}).then(res => res.data)
// 修改状态
export const changeUserState = (uId, state) => request({
  method: 'put',
  url: `/users/${uId}/state/${state}`
}).then(res => res.data)
// 根据id查询用户信息
export const searchUserById = (uId, state) => request({
  method: 'put',
  url: `/users/${uId}/state/${state}`
}).then(res => res.data)
// 根据id编辑用户信息
export const editUserInfo = (uId, data) => request({
  method: 'put',
  url: `/users/${uId}`,
  data
}).then(res => res.data)
// 根据id删除用户信息
export const deleteUser = (uId) => request({
  method: 'delete',
  url: `/users/${uId}`
}).then(res => res.data)
