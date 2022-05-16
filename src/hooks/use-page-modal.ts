import { ref } from 'vue'
import PageModal from '@/components/page-modal'

//声明一个函数类型
type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  //保存点击编辑时的那一行数据
  const defaultInfo = ref({})
  //新建用户
  const handleNewData = () => {
    //点击新建用户把保存回显的数据做一个清空，这样点击新建用户时，就不会显示回显数据了
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }

    newCb && newCb()
  }
  //编辑用户
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }

    editCb && editCb(item)
  }
  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
