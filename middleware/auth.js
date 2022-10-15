/**
 * Author: 远川
 * Date: 2022-02-21 11:17:41
 * LastEditTime: 2022-02-21 14:37:38
 * desc: 中间件，用来进行简单鉴权
 */

import devTools from '@/utils/devTools.js'

// 页面鉴权,不携带token的人，将会重定向到登录页，无法进入此页面
export default function ({ store, redirect }) {
  // 判断vuex和cookie中是否有token
  let path = ''

  // 如果没有token,证明没有登录，跳转到登录页
  if (devTools.isNullorUndefined(store.getters.token)) {
    path = '/login'
    return redirect(path)
  } else {
    // 如果有token , 借助token获取用户信息，更新vuex中的用户数据
    store.dispatch('user/GetUserInfo')
  }
}
