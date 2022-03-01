import axios from 'axios'
import NProgress from 'nprogress'

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
}
