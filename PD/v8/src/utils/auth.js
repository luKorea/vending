import Cookies from 'js-cookie'
import defaultSettings from '@/settings.js'
const TokenKey = 'Token' + defaultSettings.KEY//跟前台共用一套登录token 改为token

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles//用户权限
 * @param route//网页路由权限
 */
export function hasPermission(roles, route) {
  if (route && route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}
