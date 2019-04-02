import request from '@/utils/request.js'
// 所有商品数据
export const getCategoriesList = (type = 3) => request({
  method: 'get',
  url: '/categories',
  params: {
    type
  }
}).then(res => res.data)

/**
 * 获取商品列表
 */
export const getGoodsList = ({
  query = '',
  pagenum = 1,
  pagesize = 10
} = {}) => request({
  method: 'GET',
  url: '/goods',
  params: { // GET 参数
    query,
    pagenum,
    pagesize
  }
}).then(res => res.data)
// 添加商品列表
export const addGoods = ({ goodsName, goodsCat, goodsPrice, goodsNumber, goodsWeight, attrs = [], pics = [], goods_introduce = '' }) => request({
  method: 'post',
  url: 'goods',
  data: {
    goods_name: goodsName,
    goods_cat: goodsCat,
    goods_price: goodsPrice,
    goods_number: goodsNumber,
    goods_weight: goodsWeight,
    attrs,
    pics,
    goods_introduce
  }
})
// 获取参数列表
export const getGoodsCategoryAttrs = (catId, sel = 'many') => request({
  method: 'GET',
  url: `/categories/${catId}/attributes`,
  params: { // GET 参数
    sel
  }
}).then(res => res.data)

// 富文本提交
export const upload = files => {
  // form表单形式发送出去，设置file为键名
  const formData = new FormData()
  formData.append('file', files[0])
  return request({
    method: 'POST',
    url: '/upload',
    data: formData
  }).then(res => res.data)
}
// 添加商品分类
export const addCategory = ({ cat_pid, cat_name, cat_level }) => {
  return request({
    method: 'POST',
    url: 'categories',
    data: {
      cat_pid,
      cat_name,
      cat_level
    }
  }).then(res => res.data)
}
