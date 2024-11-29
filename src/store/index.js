import { createStore } from 'vuex'

export default createStore({
  state: {
    inferencePath: []
  },
  getters: {
  },
  mutations: {
    setInferencePath(state, path) {
      state.inferencePath = path;
    }
  },
  actions: {
    updateInferencePath({ commit }, path) {
      commit('setInferencePath', path);
    }
  },
  modules: {
  }
})
