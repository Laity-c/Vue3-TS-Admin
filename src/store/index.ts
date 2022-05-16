import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

import { getPageListData } from '@/service/main/system/system'

import { IRootState, IStoreType } from './type'

//createStore后面是可以传入一个泛型的，用来控制我们state中的类型
const store = createStore<IRootState>({
  state() {
    return {
      name: 'why',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entirMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entirMenu = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      //请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      })
      //list: departmentlist 这个是给list这个数据起别名，因为下面也有一个list，会出现重复
      const { list: departmentlist } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })
      const { list: rolelist } = roleResult.data
      //请求完整权限数据
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menulist } = menuResult.data
      //保存部门和角色数据
      commit('changeEntireDepartment', departmentlist)
      commit('changeEntireRole', rolelist)
      commit('changeEntireMenu', menulist)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  //在这里直接获取部门和角色数据是不太好的，因为有可能我们token还没有获取到，就直接发送了网络请求
  //那么这样就是有问题的，所以我们需要在一个一定能拿到tkoen的地方在请求数据
  // store.dispatch('getInitialDataAction')
}

//useStore函数的返回值类型设置为Store对象,然后在传入store对象中的类型
//最后在返回userStore函数，其实这个就是返回的一个store类型的对象
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
