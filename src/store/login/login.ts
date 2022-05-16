import { Module } from 'vuex'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRouters, mapMenusToPermissions } from '@/utils/map-menus'

import { IAccount } from '@/service/login/type'
import { ILoginState } from './type'
import { IRootState } from '../type'
import router from '@/router'

//我们需要给Module传入两个类型
//第一个类型是我们当前模块state的类型
//第二个类型是根state的类型

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true, //模块的命名空间
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    //因为我们没有给userInfo一个具体的类型，所以写的是any，如果写了，那么就把我们写的那个类型给他就行
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // userMenus => routers
      // 将用户的userMenus数据和我们现有默认的数据做一个匹配，只有路径相同的才会被返回
      const routes = mapMenusToRouters(userMenus)
      // console.log(routes)
      // 将上面返回的routers添加到我们router路由对象中
      // 将routers => router.main.children
      //先对匹配成功返回的路由数据做一个遍历
      routes.forEach((route) => {
        //然后在使用动态路由把遍历的对象都加入到,/main下的children中
        router.addRoute('main', route)
      })

      //获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
      // console.log(permissions)
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      //1.实现登陆逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)
      //发送初始化的请求（完整的role/deportment）
      dispatch('getInitialDataAction', null, { root: true })

      //2.保存用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      //3.获取用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      //4.跳转至首页
      router.push('/main')
    },
    //每次刷新时重新从，localCache取出保存的值在保存到vuex中
    loadLocalLogin({ commit, dispatch, state }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        //发送初始化的请求（完整的role/deportment）
        dispatch('getInitialDataAction', null, { root: true })
      }

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
