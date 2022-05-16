import { ILoginState } from '@/store/login/type'
import { ISystemState } from './main/system/type'
import { IDashboardState } from './main/analysis/type'

export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entirMenu: any[]
}

export interface IRootWithModute {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

//这里使用交差类型，也就是IStoreType类型，包含IRootState和IRootWithModute类型的所以属性和方法
export type IStoreType = IRootState & IRootWithModute
