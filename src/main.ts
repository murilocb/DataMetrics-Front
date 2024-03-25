import './assets/style.css'

import { createApp } from 'vue'
import Vue3Toastify, { ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(Vue3Toastify, {
  autoClose: 3000
} as ToastContainerOptions)
app.use(pinia)

app.mount('#app')
