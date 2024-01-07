import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index.ts'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
