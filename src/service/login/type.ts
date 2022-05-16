export interface IAccount {
  name: string
  password: string
}

//这个是我们data返回数据里面的类型
export interface ILoginResult {
  id: number
  name: string
  token: string
}
