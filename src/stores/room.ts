import { defineStore } from 'pinia'
import ApiService from '@/services/ApiService'

export const useRoomStore = defineStore({
  id: 'room',
  state: () => ({
    rooms: [],
    userFind: {},
    selectedRoom: {},
  }),
  actions: {
    getRooms() {
      return ApiService.apiGetAllRoom()
        .then((response) => {
          this.rooms = response.data
        })
        .catch((error) => {
          throw error
        })
    },
    getSelectedRoom(id) {
      return ApiService.apiGetRoom(id)
        .then((response) => {
          this.selectedRoom = response.data.data
        })
        .catch((error) => {
          throw error
        })
    },
    getFindUser(payload) {
      return ApiService.apiFindUser(payload)
        .then((response) => {
          this.userFind = response.data.data
        })
        .catch((error) => {
          throw error
        })
    },
  },
})
