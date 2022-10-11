/**
 * Author: 杨扬
 * Date: 2022-02-21 11:19:24
 * LastEditTime: 2022-02-21 14:28:13
 * desc: 路由导航拦截，主要用来判断登录权限
 */

import devTools from '@/utils/devTools.js'

export default ({ app, store }) => {
  // to 将访问的路径
  // from 代表从那个路径跳转而来
  // next 是一个函数，表示放行 next（'/login'） 强制跳转
  app.router.beforeEach((to, from, next) => {
    if (to.path == '/login' || to.path == '/register') {
      next()
    } else {
      // 如果有token，就先获取用户信息，再进入页面（无论是否调用成功）
      if (!devTools.isNullorUndefined(store.getters.token)) {
        store
          .dispatch('user/GetUserInfo')
          .then((res) => { })
          .catch((err) => {
            // 获取失败，代表token失效，清空token，鉴权中间件可以根据此来判断登录是否失效
            store.dispatch('user/LogOut')
          })
          .finally(() => {
            console.log('这里调用了')
            next()
          })
      } else {
        next()
      }
    }
  })
}
