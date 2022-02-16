import ApiService from '@/services/ApiService'

export default {
  namespaced: true,
  state: {
    rooms: [],
    selectedRoom: {},
  },
  mutations: {
    setRooms(state, payload) {
      state.rooms = payload
    },
    setRoom(state, payload) {
      state.rooms.push(payload)
    },
    setSelectedRoom(state, payload) {
      state.selectedRoom = payload
    },
  },
  actions: {
    getRoomsEvent({ commit }) {
      return ApiService.apiGetRooms()
        .then((response) => {
          commit('setRooms', response.data)
        })
        .catch((error) => {
          throw error
        })
    },
    getRoomEvent({ commit }, id) {
      return ApiService.apiGetRoom(id)
        .then((response) => {
          commit('setSelectedRoom', response.data.data)
        })
        .catch((error) => {
          throw error
        })
    },
    addRoomEvent({ commit }, payload) {
      return ApiService.apiAddRoom(payload)
        .then((response) => {
          if (response.status === 200) {
            commit('setSelectedRoom', response.data.data)
          } else if (response.status === 201) {
            commit('setRoom', response.data.data)
          }
        })
        .catch((error) => {
          throw error
        })
    },
  },
  getters: {
    rooms: (state) => state.rooms,
    selectedRoom: (state) => state.selectedRoom,
  },
}
