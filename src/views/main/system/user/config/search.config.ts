import { IForm } from '@/base-ui/form'
export const searchFromConfig: IForm = {
  labelWidth: '100px',
  // itemLayout: {
  //   padding: '10px 20px'
  // },
  colLayout: {
    // span: 8
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  },
  formItems: [
    {
      field: 'id',
      type: 'input',
      ladel: 'id',
      placeholder: '请输入id'
    },
    {
      field: 'name',
      type: 'input',
      ladel: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      ladel: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      type: 'input',
      ladel: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'enable',
      type: 'select',
      ladel: '用户状态',
      placeholder: '请选择用户状态',
      options: [
        { title: '启用', value: 1 },
        { title: '禁用', value: 0 }
      ]
    },
    {
      field: 'createAt',
      type: 'datepicker',
      ladel: '创建时间',
      otherOptions: {
        startPlaceholder: 'Start date',
        endPlaceholder: 'End date',
        type: 'daterange'
      }
    }
  ]
}
