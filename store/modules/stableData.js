const now = new Date()

const state = () => ({
  contractDictionary: [],
  allDictionary: null,
})

const mutations = {
  SET_AllDictionary: (state, dictionary) => {
    state.allDictionary = dictionary
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
