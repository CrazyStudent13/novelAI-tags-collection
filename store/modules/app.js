import Cookies from 'js-cookie'

const state = () => ({
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
  },
  defaultRouter: null,
  device: 'desktop',
  size: Cookies.get('size') || 'medium',
  menu: {},
})

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
    Cookies.set('menu', menu)
  },
  SET_DEFAULT_ROUTER: (state, router) => {
    state.defaultRouter = router
    Cookies.set('defaultRouter', router)
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  setMenu({ commit }, menu) {
    commit('SET_MENU', menu)
  },
  setDefaultRouter({ commit }, router) {
    commit('SET_DEFAULT_ROUTER', router)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
