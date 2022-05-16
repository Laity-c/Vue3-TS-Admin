//因为多个页面在使用page-content这个组件时，会发送不同的网络请求
//那么我们需要把他们获取到的值，都保存到不同的变量中去

//虽然所有的属性名都有相似处，可以使用一个对象来保存，但不建议这样来完成
//因为当我们把所有的数据都放在一起了，那么就不便于我们以后调试了
export interface ISystemState {
  usersList: any[]
  usersCount: number
  roleList: any[]
  roleCount: number
  goodsList: any[]
  goodsCount: number
  menuList: any[]
  menuCount: number
  departmentList: any[]
  departmentCount: number
  categoryList: any[]
  categoryCount: number
}
