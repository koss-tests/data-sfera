import { createApp } from 'vue'
import './assets/styles/index.scss'
import 'primeicons/primeicons.css'
import router from './router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'

const MyPreset = definePreset(Aura, {})

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(pinia)

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'app-styles, primevue, another-css-library',
      },
    },
  },
})

app.mount('#app')
