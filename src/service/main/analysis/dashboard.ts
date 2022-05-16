import hyRequest from '@/service'
import { IDataType } from '@/service/type'

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale',
  amountGoodsList = '/goods/amount/list'
}

export function getCategoryGoodsCount() {
  return hyRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return hyRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return hyRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return hyRequest.get<IDataType>({
    url: DashboardAPI.addressGoodsSale
  })
}

export function getAmountGoodsList() {
  return hyRequest.get<IDataType>({
    url: DashboardAPI.amountGoodsList
  })
}
