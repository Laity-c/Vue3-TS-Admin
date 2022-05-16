type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  //类型
  type: IFormType
  //名称
  ladel: string
  //验证
  rules?: any[]
  //输入框内文字
  placeholder?: any
  //针对select
  options?: any[]
  //针对其他特殊的属性
  otherOptions?: any
  //显示或隐藏当前元素
  isHidden?: boolean
}

//formItems的类型IFormItem[]就是一个数组对象类型，就是又能是数组也能是对象
//例：比如传递的数据是这样子的：const k:IFormItem = [{},{}]

export interface IForm {
  title?: string
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemLayout?: any
}
