import type { AxiosRequestConfig, AxiosResponse } from 'axios'

//使用接口创建拦截器类型
//我们把这个类型都定义成了可选参数，也就是说可以传递其中任意一个或多个，或一个都不传也行
export interface HYRequestInterfaceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch: (error: any) => any
}
//定义一个HYRequestConfig接口继承了AxiosRequestConfig类型,那么我们就
//因为AxiosRequestConfig类型一开始是没有我们拦截器类型的,所以我们自己把定义好的拦截器类型在加入到我们的配置信息中
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterfaceptors<T>
  showLoading?: boolean
}
