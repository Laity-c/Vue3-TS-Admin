import hyRequest from '../index'
import { IAccount, ILoginResult } from './type'
import { IDataType } from '../type'
//我们把url定义在外面是为了方便以后修改
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // /users/1
  UserMenus = '/role/' //用法：role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  //为什么是<IDataType<ILoginResult>>这样写呢：
  //因为IDataType这个泛型是传递给我们封装post中的泛型
  //ILoginResult类型是我们在IDateType中定义的泛型
  //IDataType这个类型用来控制我们数据返回的类型
  //ILoginResult这个类型用来控制我们数据返回中的data属性中的类型
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false //我们只需要在验证登陆账号时，需要转圈的组件显示
  })
}

export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
