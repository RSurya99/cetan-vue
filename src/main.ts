import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// css
import './assets/sass/app.scss'
import './assets/css/vendor.css'

import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_KEY,
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  forceTLS: true,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
