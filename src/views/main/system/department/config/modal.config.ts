import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '新建部门',
  formItems: [
    {
      field: 'name',
      type: 'input',
      ladel: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'parentId',
      type: 'select',
      ladel: '上级部门',
      placeholder: '请输入上级部门',
      options: []
    },
    {
      field: 'leader',
      type: 'input',
      ladel: '领导名称',
      placeholder: '请输入领导名称'
    }
  ],
  colLayout: {
    span: 24
  },
  itemLayout: {}
}
