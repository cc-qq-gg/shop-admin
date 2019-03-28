import request from '@/utils/request.js'
// 所有商品数据
export const getCategoriesList = () => request({
  method: 'get',
  url: '/categories'
}).then(res => res.data)

/**
 * 获取商品列表
 */
export const getGoodsList = ({
  query = '',
  pagenum = 1,
  pagesize = 20
} = {}) => request({
  method: 'GET',
  url: '/goods',
  params: { // GET 参数
    query,
    pagenum,
    pagesize
  }
}).then(res => res.data)
