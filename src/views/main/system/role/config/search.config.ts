import { IForm } from '@/base-ui/form'
export const searchFromConfig: IForm = {
  labelWidth: '100px',
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
      field: 'name',
      type: 'input',
      ladel: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      type: 'input',
      ladel: '权限介绍',
      placeholder: '请输入权限介绍'
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
