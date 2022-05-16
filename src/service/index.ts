//service统一出口
import HYRequest from './request'
//引入配置文件
import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'

//创建类的实现对象
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      //拦截器作用四
      //添加token拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }

      // console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (error) => {
      // console.log('请求失败的拦截')
      return error
    },
    responseInterceptor: (res) => {
      // console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (error) => {
      // console.log('响应失败的拦截')
      return error
    }
  }
})

//测试所有实例都有的拦截器，也就是自己没有写拦截器，那么也会有默认的拦截器
// const hyRequest = new HYRequest({
//   baseURL: BASE_URL,
//   timeout: TIME_OUT
// })

export default hyRequest
