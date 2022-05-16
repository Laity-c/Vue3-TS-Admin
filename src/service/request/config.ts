//第一种方式来区分环境变量(不推荐使用)
//需要使用到哪个环境就把注释打开
// const BASE_URL = 'http://codepfp.org/dev'
// const BASE_NAME = 'pfp'

// const BASE_URL = 'http://codepfp.org/prod'
// const BASE_NAME = 'koba'

// const BASE_URL = 'http://codepfp.org/test'
// const BASE_NAME = 'why'

//第二种方式
// 根据process.env.NODE_ENV来区分
// 开发环境：development
// 生产环境：production
// 测试环境：test

//导出变量时是需要在声明时导出的。如果不在声明时导出就只能使用{}的方式来进行导出

export let BASE_URL = ''
export const TIME_OUT = 10000

//使用if来进行判断
if (process.env.NODE_ENV === 'development') {
  //因为我们已经把我们的url交给我们webpack中的devServer中代码了
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://codepfp.org/prod'
} else {
  //这里继续if判断tese和直接写else是差不多的。都可以
  BASE_URL = 'http://codepfp.org/test'
}

// console.log(BASE_URL)
// console.log(BASE_NAME)
//第三种方式就是创建.env文件，在里面写环境变量
