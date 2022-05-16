import { useStore } from '@/store'

//传入页面的pageName和权限名称
export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore()
  //获取在登陆时保存的权限名称
  const permissions = store.state.login.permissions
  //验证当前用户拥有哪些权限
  const verifyPermission = `system:${pageName}:${hanldeName}`
  //对用户保存的所有权限，做一个判断，判断当前用户拥有哪些权限
  return !!permissions.find((item) => item === verifyPermission)
}
