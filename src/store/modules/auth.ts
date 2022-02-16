import ApiService from '@/services/ApiService'

export default {
  namespaced: true,
  state: {
    user: {},
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
  },
  actions: {
    loginEvent({ commit }, payload) {
      return ApiService.apiLogin(payload)
        .then((response) => {
          commit('setUser', response.data.data)
        })
        .catch((error) => {
          throw error
        })
    },
  },
  getters: {
    user: (state) => state.user,
    isAuthenticated: (state) => (Object.keys(state.user).length === 0 ? false : true),
  },
}
