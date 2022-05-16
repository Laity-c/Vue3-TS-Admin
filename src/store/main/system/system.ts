import { IRootState } from '@/store/type'
import { Module } from 'vuex'
import { ISystemState } from './type'

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0,
      categoryList: [],
      categoryCount: 0
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    changeDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList
    },
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount
    },
    changeCategoryList(state, categoryList: any[]) {
      state.categoryList = categoryList
    },
    changeCategoryCount(state, categoryCount: number) {
      state.categoryCount = categoryCount
    }
  },
  getters: {
    pageListDate(state) {
      return (pageName: string) => {
        //也可以直接返回要获取的数据名，但需要对state做一个类型转换
        //这个就相当于state[userList]
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //     break
        //   case 'role':
        //     return state.roleList
        //     break
        // }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListActions({ commit }, payload: any) {
      // 1.获取pagUrl值
      //接收pageName值
      const pageName = payload.pageName
      //第一个解决动态url的办法
      //如果后端接口写的比较规范那么我们可以直接使用模板字符串给拼接起来
      const pageUrl = `/${pageName}/list`

      //第二个解决动态url的办法
      //如果后端接口写的乱七八糟的，那么我们就不能使用第一种办法了，我们也可以使用switch来判断
      //通过传递过来的pageName值，来进行判断然后在来给pageUrl完成赋值
      // let pageUrl = ''
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }

      //第三个解决动态url的办法
      // 通过传递过来的pageName值来取map函数中的值
      //例: const mapName = {user: 'users/list', role: 'role/list'}
      //取值:
      // mapName[pageName] 这样就能取到我们想要的url值了

      //2.对页面发送网络请求
      const PageResult = await getPageListData(pageUrl, payload.queryInfo)

      //3.保存数据
      const { list, totalCount } = PageResult.data

      //对pageName首字母做一个大写的转换
      const changPageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${changPageName}List`, list)
      commit(`change${changPageName}Count`, totalCount)
      //我们保存数据时，也需要使用动态来保存，因为每次保存的数据都是不一样的
      //所以我们也可以使用pageName来判断后，在进行不同的保存
      // switch (pageName) {
      //   case 'user':
      //     commit('changeUsersList', list)
      //     commit('changeUsersCount', totalCount)
      //     break
      //   case 'role':
      //     commit('changeRoleList', list)
      //     commit('changeRoleCount', totalCount)
      //     break
      // }
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      //1.获取pageName和id
      //pageName -> /users
      //id => /users/id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`

      //2.调用删除网络请求
      await deletePageData(pageUrl)

      //3.重新请求最新的数据
      dispatch('getPageListActions', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async createPageDataAction({ dispatch }, payload: any) {
      console.log(payload)
      //1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      const createeReslt = await createPageData(pageUrl, newData)
      console.log(createeReslt)

      //2.请求最新的数据
      dispatch('getPageListActions', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async editPageDataAction({ dispatch }, payload: any) {
      //1.修改数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      //2.请求最新的数据
      dispatch('getPageListActions', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
