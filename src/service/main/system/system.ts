import hyRequest from '../../index'
import { IDataType } from '../../type'

export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return hyRequest.delete<IDataType>({
    url: url
  })
}
//创建用户
export function createPageData(url: string, newData: any) {
  return hyRequest.post<IDataType>({
    url,
    data: newData
  })
}

//编辑用户数据
export function editPageData(url: string, editData: any) {
  return hyRequest.patch<IDataType>({
    url,
    data: editData
  })
}
