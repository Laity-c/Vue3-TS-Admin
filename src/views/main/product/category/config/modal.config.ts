import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '新建类别',
  formItems: [
    {
      field: 'name',
      type: 'input',
      ladel: '类别名称',
      placeholder: '请输入类别名称'
    }
  ],
  colLayout: {
    span: 24
  },
  itemLayout: {}
}
