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
      ladel: '类别',
      placeholder: '请输入类别名称'
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
