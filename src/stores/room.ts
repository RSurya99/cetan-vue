import { defineStore } from 'pinia'
import ApiService from '@/services/ApiService'

interface Self {
  name: string
  email: string
  email_verified_at: number
  token: number
  created_at: string
  bio: string
  id: number
  images: []
}

interface Opponent {
  name: string
  email: string
  email_verified_at: number
  token: number
  created_at: string
  bio: string
  id: number
  images: []
}

interface Message {
  id: number
  from: number
  to: number
  message: string
  seen: boolean
  created_at: string
}

interface Room {
  room_id: number
  self: Self
  opponent: Opponent
  created_at: string
  messages: Message[]
}

export const useRoomStore = defineStore({
  id: 'room',
  state: () => ({
    rooms: [],
    userFind: {},
    selectedRoom: {} as Room,
  }),
  getters: {
    isSelectedRoomEmpty: (state) => (Object.keys(state.selectedRoom).length === 0 ? false : true),
  },
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
    sendMessageEvent(payload) {
      return ApiService.apiSendMessage(payload).catch((error) => {
        throw error
      })
    },
  },
})
