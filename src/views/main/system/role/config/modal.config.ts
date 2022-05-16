import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '新建角色',
  formItems: [
    {
      field: 'name',
      type: 'input',
      ladel: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      ladel: '权限介绍',
      placeholder: '请输入权限介绍'
    }
  ],
  colLayout: {
    span: 24
  },
  itemLayout: {}
}
