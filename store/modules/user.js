import { getToken } from '@/utils/auth'
// import { getUserInfo } from '@/api/user.js'

const user = {
  namespaced: true,
  state: () => ({
    token: getToken(),
    name: '远川',
    roles: [],
    permissions: [],
    userInfo: {},
    oldUserInfo: {},
    oldPermissions: [],
  }),
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_OLD_PERMISSIONS: (state, permissions) => {
      state.oldPermissions = permissions
    },
  },

  actions: {
    // // 登录
    // Login({ commit }, userInfo) {
    //   const username = userInfo.username.trim()
    //   const password = userInfo.password
    //   const code = userInfo.code
    //   const uuid = userInfo.uuid
    //   return new Promise((resolve, reject) => {
    //     login(username, password, code, uuid)
    //       .then((res) => {
    //         setToken(res.token)
    //         commit('SET_TOKEN', res.token)
    //         resolve()
    //       })
    //       .catch((error) => {
    //         reject(error)
    //       })
    //   })
    // },
    // 获取用户信息
    // GetUserInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo()
    //       .then((res) => {
    //         const user = res.user
    //         if (res.roles && res.roles.length > 0) {
    //           // 验证返回的roles是否是一个非空数组
    //           commit('SET_ROLES', res.roles)
    //           commit('SET_PERMISSIONS', res.permissions)
    //         } else {
    //           commit('SET_ROLES', ['ROLE_DEFAULT'])
    //         }
    //         commit('SET_USERINFO', user)
    //         resolve(res)
    //       })
    //       .catch((error) => {
    //         reject(error)
    //       })
    //   })
    // },
    // // 退出系统
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token)
    //       .then(() => {
    //         commit('SET_TOKEN', '')
    //         commit('SET_ROLES', [])
    //         commit('SET_PERMISSIONS', [])
    //         removeToken()
    //         resolve()
    //       })
    //       .catch((error) => {
    //         reject(error)
    //       })
    //   })
    // },
  },
}

export default user
