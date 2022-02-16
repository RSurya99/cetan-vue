import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// css
import './assets/css/vendor.css'
import 'nprogress/nprogress.css'

createApp(App).use(router).mount('#app')
