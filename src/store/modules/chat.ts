import ApiService from '@/services/ApiService'

export default {
  namespaced: true,
  state: {
    userFind: {},
  },
  mutations: {
    setUserFind(state, payload) {
      state.userFind = payload
    },
  },
  actions: {
    sendMessageEvent(context, payload) {
      return ApiService.apiSendMessage(payload).catch((error) => {
        throw error
      })
    },
    findUserEvent({ commit }, payload) {
      return ApiService.apiFindUser(payload)
        .then((response) => {
          commit('setUserFind', response.data.data)
        })
        .catch((error) => {
          throw error
        })
    },
  },
  getters: {
    userFind: (state) => state.userFind,
  },
}
