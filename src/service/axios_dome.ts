import axios from 'axios'

// //1.get请求
// axios.get('http://httpbin.org/get').then((res) => {
//   console.log(res)
// })

// //2.get请求并传入参数
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'pfp',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })

// //3.post请求并传入参数
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'coderpfp',
//       age: 19
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })

// promise本身就是有类型的，res也是有类型的
//4.axios的额外配置
//这是全局的配置，我们也可以在请求里面写局部配置信息
axios.defaults.baseURL = 'http://httpbin.org' //配置路径
axios.defaults.timeout = 10000 //配置请求超时时间
// axios.defaults.headers = {}

//2.get请求并传入参数
// axios
//   .request({
//     method: 'GET',
//     url: '/get'
//   })
//   .then((res) => {
//     console.log(res)
//   })

axios
  .get('/get', {
    params: {
      name: 'pfp',
      age: 18
    },
    //每个请求单独的配置
    timeout: 1000
  })
  .then((res) => {
    console.log(res)
  })

//3.post请求并传入参数
axios
  .post('/post', {
    data: {
      name: 'coderpfp',
      age: 19
    }
  })
  .then((res) => {
    console.log(res)
  })

//5.axios.all多个请求一起返加数据
// axios.all的内部用的就是promise.all来实现的
axios
  .all([
    axios.get('/get', { params: { age: 20 } }),
    axios.post('/post', { data: { age: 30 } })
  ])
  .then((res) => {
    console.log(res)
  })

//6.axios拦截器
//fn1：请求发送成功要执行的函数
//fn2：请求发送失败要执行的函数
axios.interceptors.request.use(
  (config) => {
    //想做的一些操作
    console.log('请求成功拦截')
    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)

// fn1:数据响应成功(服务器正常的返回数据)
axios.interceptors.response.use(
  (res) => {
    //对数据返回时做一些操作
    console.log('响应成功的拦截 ')
    return res.data
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)
