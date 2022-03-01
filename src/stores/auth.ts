import { defineStore } from 'pinia'
import ApiService from '@/services/ApiService'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || '{}'),
  }),
  getters: {
    isAuthenticated: (state) => (Object.keys(state.user).length === 0 ? false : true),
  },
  actions: {
    loginEvent(payload) {
      return ApiService.apiLogin(payload)
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response.data.data))
        })
        .catch((error) => {
          throw error
        })
    },
    registerEvent(payload) {
      return ApiService.apiRegister(payload).catch((error) => {
        throw error
      })
    },
  },
})
