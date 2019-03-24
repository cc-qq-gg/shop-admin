
import request from '@/utils/request.js'

export const login = (data) => request({
  method: 'POST',
  url: '/login',
  data: { // POST 参数
    username: data.username,
    password: data.password
  }
}).then(res => res.data)
