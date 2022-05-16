import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '新建用户',
  formItems: [
    {
      field: 'name',
      type: 'input',
      ladel: '用户名称',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      ladel: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      type: 'password',
      ladel: '密码',
      placeholder: '请输密码',
      isHidden: false
    },
    {
      field: 'cellphone',
      type: 'input',
      ladel: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'departmentId',
      type: 'select',
      ladel: '选择部门',
      placeholder: '请选择部门',
      options: []
    },
    {
      field: 'roleId',
      type: 'select',
      ladel: '选择角色',
      placeholder: '请选择角色',
      options: []
    }
  ],
  colLayout: {
    span: 24
  },
  itemLayout: {}
}
