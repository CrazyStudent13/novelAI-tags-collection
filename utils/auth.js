/**
 * Author: 远川
 * Date: 2022-02-21 11:19:24
 * LastEditTime: 2022-02-21 14:29:07
 * desc: token在cookie中的存取
 */

import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
  // return 'trest'
}

export function getTokenForAuthorization() {
  let header = { Authorization: 'Bearer ' + getToken() }
  return header
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
