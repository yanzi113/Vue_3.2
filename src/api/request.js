import axios from 'axios'
import { ElMessage } from 'element-plus'
import { diffTokenTime } from '@/utils/auth'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 要为每个接口添加上token信息
// 所以使用请求拦截器
service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      if (diffTokenTime()) {
        store.dispatch('app/logout')
        return Promise.reject(new Error('token 失效了'))
      }
    }
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)
// service.interceptors.response.use(
//   (response) => {
//     // console.log(response)
//     const { data, meta } = response.data
//     if (meta.status === 200 || meta.status === 201) {
//       return data
//     } else {
//       ElMessage.error(meta.msg)
//       return Promise.reject(response.data)
//     }
//   },
//   (error) => {
//     error.response && ElMessage.error(error.response.data)
//     return Promise.reject(error.response.data)
//   }
// )
service.interceptors.response.use(
  (response) => {
    const { data, meta } = response.data
    if (meta.status === 200 || meta.status === 201) {
      return data
    } else {
      ElMessage.error(meta.msg)
      return Promise.reject(response.data)
    }
  },
  (error) => {
    if (error.response) {
      const { data } = error.response
      ElMessage.error(data.meta.msg)
      return Promise.reject(data)
    } else {
      // 处理没有响应的错误
      // 例如网络错误或超时
      return Promise.reject(error)
    }
  }
)

export default service
