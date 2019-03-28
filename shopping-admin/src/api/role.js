// 封装了基础路由地址，路由过滤和非登录页获取token拦截器的axios实例
import request from '@/utils/request.js'
// 获取角色列表
export const getRoleList = () => request({
  method: 'get',
  url: '/roles'
}).then(res => res.data)
// 更新用户类别
export const updateUserRoleByUserId = (userId, roleId) => request({
  method: 'PUT',
  url: `/users/${userId}/role`,
  data: { // PUT 请求体和 POST 一样
    rid: roleId
  }
}).then(res => res.data)
// 增加角色
export const addRole = (role) => request({
  method: 'post',
  url: '/roles',
  data: {
    roleName: role.roleName,
    roleDesc: role.roleDesc
  }
}).then(res => res.data)

// 根据id查询角色
export const getRole = (id) => request({
  method: 'get',
  url: `/roles/${id}`
}).then(res => res.data)
// 根据id提交编辑
export const roleEdited = (data) => request({
  method: 'put',
  url: `/roles/${data.roleId}`,
  data: {
    roleName: data.roleName,
    roleDesc: data.roleDesc
  }
}).then(res => res.data)
// 根据id删除
export const roleDelete = id => request({
  method: 'delete',
  url: 'roles/' + id
})
// 删除角色指定权限
export const rightDelete = (roleId, rightId) => request({
  method: 'delete',
  url: `roles/${roleId}/rights/${rightId}`
}).then(res => res.data)
