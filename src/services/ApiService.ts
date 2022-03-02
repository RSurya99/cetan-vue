import axios from 'axios'
import NProgress from 'nprogress'
import { useAuthStore } from '@/stores/auth'

const instance = axios.create({
  baseURL: 'https://api-cetan.herokuapp.com/api',
  timeout: 10000,
})

instance.interceptors.request.use((config) => {
  NProgress.start()
  return config
})

instance.interceptors.response.use((response) => {
  NProgress.done()
  return response
})

export default {
  apiLogin(event) {
    return instance.post('/login', event)
  },
  apiRegister(event) {
    return instance.post('/register', event)
  },
  apiLogout() {
    const authStore = useAuthStore()
    return instance.post(
      '/logout',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + authStore.user.token,
          'Content-Type': 'application/json',
        },
      }
    )
  },
  apiGetAllRoom() {
    const authStore = useAuthStore()
    return instance.get('/room', {
      headers: {
        Authorization: 'Bearer ' + authStore.user.token,
        'Content-Type': 'application/json',
      },
    })
  },
  apiGetRoom(id) {
    const authStore = useAuthStore()
    return instance.get(`/room/${id}`, {
      headers: {
        Authorization: 'Bearer ' + authStore.user.token,
      },
    })
  },
  apiFindUser(event) {
    return instance.post('/search-user', event)
  },
}
