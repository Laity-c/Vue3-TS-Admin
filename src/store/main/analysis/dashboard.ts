import { Module } from 'vuex'

import { IRootState } from '../../type'
import { IDashboardState } from './type'

import {
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale,
  getAddressGoodsSale,
  getAmountGoodsList
} from '@/service/main/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: [],
      amountGoodsList: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    },
    changeAmountGoodsList(state, list) {
      state.amountGoodsList = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      //1.获取图表数据
      const categoryCountResult = await getCategoryGoodsCount()
      const categoryFavorResult = await getCategoryGoodsFavor()
      const categorySaleResult = await getCategoryGoodsSale()
      const addressSaleResult = await getAddressGoodsSale()
      const amountListResult = await getAmountGoodsList()

      //2.保存图表数据
      commit('changeCategoryGoodsCount', categoryCountResult.data)
      commit('changeCategoryGoodsFavor', categoryFavorResult.data)
      commit('changeCategoryGoodsSale', categorySaleResult.data)
      commit('changeAddressGoodsSale', addressSaleResult.data)
      commit('changeAmountGoodsList', amountListResult.data)
    }
  }
}

export default dashboardModule
