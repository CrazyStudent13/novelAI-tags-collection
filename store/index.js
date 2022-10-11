import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import stableData from './modules/stableData' // 一些不怎么常用经常改动的数据，比如数据字典
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    stableData,
  },
  getters,
})

export default () => store
