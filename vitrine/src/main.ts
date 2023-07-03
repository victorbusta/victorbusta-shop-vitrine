import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import router from './router'
import ImgLazyLoading from './ImgLazyLoading'
import './assets/main.css'
import type { Directive } from 'vue';

const app = createApp(App)

app.directive('img-lazy', ImgLazyLoading as Directive<any, any>);
app.use(router)
app.use(createPinia())
app.use(createVuetify())

app.mount('#app')
