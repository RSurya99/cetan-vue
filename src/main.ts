import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// css
import './assets/css/app.scss'
import './assets/css/vendor.css'
import 'nprogress/nprogress.css'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_KEY,
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  forceTLS: true,
})

createApp(App).use(router).use(store).mount('#app')
