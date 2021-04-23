import Cookies from 'js-cookie'
import defaultSettings from '@/settings.js'
const TokenKey = 'Token'+defaultSettings.KEY//跟前台共用一套登录token 改为token

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
