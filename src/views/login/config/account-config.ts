//编写好的账号密码规则
export const rules = {
  name: [
    {
      required: true,
      message: '用户名是必须传的~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5-10个字母或者数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必须传的~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,}$/,
      message: '密码必须是5位以上的字母或者数字~',
      trigger: 'blur'
    }
  ]
}
