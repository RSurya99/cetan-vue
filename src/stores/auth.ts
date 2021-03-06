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
          this.user = response.data.data
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
    logoutEvent() {
      return ApiService.apiLogout()
        .then(() => {
          localStorage.removeItem('user')
          this.user = {}
        })
        .catch((error) => {
          throw error
        })
    },
  },
})
