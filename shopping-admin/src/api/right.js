import request from '@/utils/request.js'
// 根据类型获取权限列表
export const rightList = (type) => request({
  method: 'get',
  url: `/rights/${type}`
}).then(res => res.data)
// 根据类型获取权限列表
export const updateAuth = (roleId, rids) => request({
  method: 'post',
  url: `/roles/${roleId}/rights`,
  data: { rids }
}).then(res => res.data)
// 左侧全选菜单
export const getMenuList = () => request({
  method: 'get',
  url: '/menus'
}).then(res => res.data)
