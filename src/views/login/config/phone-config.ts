//编写的配置手机号规则
export const rules = {
  number: [
    {
      required: true,
      message: '手机号是必须传的~',
      trigger: 'blur'
    },
    {
      pattern: /^1[0-9]{10}$/,
      message: '手机号必须是以1开头的11位数字~',
      trigger: 'blur'
    }
  ],
  verification: [
    {
      required: true,
      message: '验证码是必须传的~',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{6}$/,
      message: '验证码必须是6位数字~',
      trigger: 'blur'
    }
  ]
}
