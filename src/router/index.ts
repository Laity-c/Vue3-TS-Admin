import { createRouter, createWebHashHistory } from 'vue-router'
//加个type就是让别人知道我们导入的是一个类型,不加type也可以
import type { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'

import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('views/main/main.vue')
    // children: [] 根据userMenus来决定要加载哪些子路由
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

//导航守卫
router.beforeEach((to) => {
  //路径不为login都会进入到里面去
  if (to.path !== '/login') {
    //获取用户是否有token
    const token = localCache.getCache('token')
    //没有token则是没有登陆的状态，那么就返回登陆页面
    if (!token) {
      return '/login'
    }
  }

  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
