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
