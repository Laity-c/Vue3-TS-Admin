import { IBreadcrumb } from '@/base-ui/breadcrumb'
import type { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

//这个函数返回的是我们一条条路由记录，所以就和我们router中index.ts文件保存路由属性的类型是一样的
export function mapMenusToRouters(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  //1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // require.contextp这个是webpack中的一个加载文件夹的工具函数
  // 第一个参数为目标文件夹路径
  // 第二个参数为是否需要递归调用
  // 第三个参数为匹配到的文件
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // console.log(routeFiles.keys())
  routeFiles.keys().forEach((key) => {
    //把获取到的路径做一个拼接
    //这是我们获取到的路径./analysis/dashboard/dashboard.ts
    //需要拼接成../router/main/analysis/dashboard/dashboard (.ts本身就可以省略掉)
    const route = require('../router/main' + key.split('.')[1])
    //最后在把我们获取到的数据放到allRoutes属性中
    allRoutes.push(route.default)
  })
  console.log(allRoutes)
  //2.根据菜单获取需要添加的routes
  //userMenus:
  //我们需要对接口中菜单的数据进行判断,type值为1那么我们就对里面的childrn继续遍历，在判断里面的type值，还为1就继续对childrn遍历
  //type === 1 => childrn => type ===1 => childrn
  //如果childrn遍历中的有type值为2的也就是我们可以点击的页面， 我们就需要把他里面的url值取出，和我们上面默认的路径做一个比较
  //最后在把相同的保存到我们的routes属性中
  //type === 2 => url => router

  //创建一个递归函数来获取匹配的路由
  const _recurseGetRoute = (menus: any[]) => {
    //遍历我们的用户获取到的菜单数据
    for (const menu of menus) {
      // 如果为2就取出menu的url值和我们上面所有路由所一个匹配，匹配成功的就添加到routes数据中
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        //因为使用的ts，route可能会没有值，所以需要加个if保证有值，才能进行添加操作
        if (route) routes.push(route)
        //将第一个可点击的菜单对象保存起来
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        //如果type不为2那么我们就继续将获取到的menu.children属性传递出我们自身函数，来一个递归调用
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)

  //返回最后匹配成功的路由
  return routes
}

// 合并两个函数
//获取面包屑导航数据
export function pathMapBreadcrumbs(userMenu: any[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenu, currentPath, breadcrumbs)
  return breadcrumbs
}

//获取跳转到mian路径后自动跳转到子路径
export function pathMapToMenu(
  userMenu: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  //遍历我们的菜单
  for (const menu of userMenu) {
    //为一就继续递归调用
    if (menu.type === 1) {
      //接收符合的menu对象，然后返回出去
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        // breadcrumbs?.push({ name: menu.name, path: menu.url })
        // breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
        //我们的项目中暂时不需要使用path所以我们不传入path数据
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
      //为二且路径和我们参数路径相符合，但直接返回当前menu对象
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// //获取面包屑导航数据
// export function pathMapBreadcrumbs(userMenu: any[], currentPath: string): any {
//   const breadcrumbs: IBreadcrumb[] = []
//   for (const menu of userMenu) {
//     //为一就继续递归调用
//     if (menu.type === 1) {
//       //接收符合的menu对象，然后返回出去
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         breadcrumbs.push({ name: menu.name, path: menu.url })
//         breadcrumbs.push({ name: findMenu.name, path: findMenu.url })
//         return breadcrumbs
//       }
//       //为二且路径和我们参数路径相符合，但直接返回当前menu对象
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
//   return breadcrumbs
// }

// //获取跳转到mian路径后自动跳转到子路径
// export function pathMapToMenu(userMenu: any[], currentPath: string): any {
//   //遍历我们的菜单
//   for (const menu of userMenu) {
//     //为一就继续递归调用
//     if (menu.type === 1) {
//       //接收符合的menu对象，然后返回出去
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) return findMenu
//       //为二且路径和我们参数路径相符合，但直接返回当前menu对象
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
// }

export function mapMenusToPermissions(userMenus: any[]) {
  //创建一个保存权限的数组
  const permissions: string[] = []

  //创建递归函数来取出权限保存到数组中
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      //为1和2都不是我们要的权限就继续递归遍历
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
        //只有3才是保存了我们的权限，我们就保存到数组中
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  //最后把保存权限的数组返回出去
  return permissions
}
//获取权限id回显数据
export function mapMenuLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }

  _recurseGetLeaf(menuList)
  return leftKeys
}

export { firstMenu }
