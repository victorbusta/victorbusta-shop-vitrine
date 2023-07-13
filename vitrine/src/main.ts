import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import router from './router'
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(createVuetify())

app.mount('#app')
