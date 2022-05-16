import axios from 'axios'
//我们封装的主要目的就是为了让我们项目在使用axios时对他的依赖性没有那么高
//我们下面封装的axios也就只有引入axios时对他是完全依赖的
//引入axios创建实例和传入config的类型
import type { AxiosInstance } from 'axios'
import { ElLoading } from 'element-plus'
import 'element-plus/es/components/loading/style/css'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

import type { HYRequestInterfaceptors, HYRequestConfig } from './type'

const DEAFULT_LOADING = true //默认为true，给loading当默认值使用

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterfaceptors
  //我们在这里也保留showLoading，为一个必传属性，不传默认为true
  showLoading: boolean
  //loading的类型为ElLoading返回值的值
  loading?: LoadingInstance

  //config类型扩展为HYRequestConfig，就是为了让别人使用时能给我们传入拦截器
  constructor(config: HYRequestConfig) {
    //每new一个实现类，传入的config都会创建一个新的实例
    this.instance = axios.create(config)
    //保存我们传递过来的intanceptors(也就是拦截器)
    this.interceptors = config.interceptors

    this.showLoading = config.showLoading ?? DEAFULT_LOADING

    //从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //添加所有实例都有的拦截器
    this.instance.interceptors.response.use(
      (config) => {
        // console.log('所有实例请求成功的拦截')
        //拦截器作用五
        if (this.showLoading) {
          //为true才显示
          //添加loadin组件，并使用loading属性接收
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading...',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (error) => {
        // console.log('所有实例请求失败的拦截')
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例响应成功的拦截')

        //将loading移除，因为loading可能会没有值，所以加个可选链调用方法
        this.loading?.close()

        const data = res.data
        //拦截器作用1：
        //有些请求成功返回200也可能是失败的请求,错误码就在data.returnCode中
        if (data.returnCode === '-1001') {
          console.log('请求失败，错误信息')
        } else {
          return data
        }
      },
      (error) => {
        // console.log('所有实例响应失败的拦截')
        //作用2：
        //例子：判断不同的httpErrorCode显示不同的错误信息
        //也可以使用switch(error.response.status)来判断
        if (error.response.status === '404') {
          console.log('404错误')
        }
        return error
      }
    )
  }

  //对请求方法做封装
  //request返回值为promise但类型为T
  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //请求方法中的拦截器设置
      //单个请求config的设置
      //判断config中有没有传入拦截器,传入了在修改我们请求成功的信息
      if (config.interceptors?.requestInterceptor) {
        //因为config.interceptors.requestInterceptor(config)所返回的就是我们请求方法中拦截器修改请求成功的信息
        //所以我们直接把他的返回值赋给config就行了
        config = config.interceptors.requestInterceptor(config)
      }
      //当我们在config中给showLoading属性传递为false时，应该为不显示
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        //因为我们需要把request的类型修改为T类型，但request的类型第一个为any，第二个才是我们想要修改的所以我们第一个传了any
        .request<any, T>(config)
        .then((res) => {
          //单个请求数据的设置
          if (config.interceptors?.responseInterceptor) {
            // 我们这里直接传过来T类型，修改了res本身的类型，造成了类型不匹配
            res = config.interceptors.responseInterceptor(res)
          }
          // console.log(res)
          //将showLoading设置为true，这样就不传影响下个请求的使用
          this.showLoading = DEAFULT_LOADING
          resolve(res)
        })
        .catch((error) => {
          //响应失败也需要使用设置为true
          this.showLoading = DEAFULT_LOADING
          reject(error)
          return error
        })
    })
  }

  //其余方法的封装，都是一样的，传入config给request但method都是不一样的
  //...config就是取出里面所有属性
  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
