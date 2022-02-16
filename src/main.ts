import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// css
import './assets/css/vendor.css'
import 'nprogress/nprogress.css'

createApp(App).use(router).use(store).mount('#app')
