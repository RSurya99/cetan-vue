import { defineStore } from 'pinia'
import ApiService from '@/services/ApiService'

export const useRoomStore = defineStore({
  id: 'room',
  state: () => ({
    rooms: [],
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
  },
})
