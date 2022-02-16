import axios from 'axios'
import NProgress from 'nprogress'
import store from '@/store'

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
  apiGetRooms() {
    return instance.get('/room', {
      headers: {
        Authorization: 'Bearer ' + store.state.auth.user.token,
      },
    })
  },
  apiGetRoom(id) {
    return instance.get(`/room/${id}`, {
      headers: {
        Authorization: 'Bearer ' + store.state.auth.user.token,
      },
    })
  },
  apiAddRoom(event) {
    return instance.post('/room', event, {
      headers: {
        Authorization: 'Bearer ' + store.state.auth.user.token,
      },
    })
  },
  apiSendMessage(event) {
    return instance.post('/message', event, {
      headers: {
        Authorization: 'Bearer ' + store.state.auth.user.token,
        'Content-Type': 'application/json',
      },
    })
  },
  apiFindUser(event) {
    return instance.post('/search-user', event)
  },
}
