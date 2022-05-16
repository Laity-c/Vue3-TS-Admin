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
      field: 'name',
      type: 'input',
      ladel: '部门名称',
      placeholder: '请输入部门名称'
    },
    {
      field: 'leader',
      type: 'input',
      ladel: '部门领导',
      placeholder: '请输入部门领导'
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
