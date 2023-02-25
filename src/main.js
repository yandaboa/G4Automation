import { createApp } from 'vue'
import { initializeApp } from "firebase/app"
import {firebaseConfig} from '../firebaseConfig.js'
import App from './App.vue'
import router from './router'

// firebase.initializeApp(firebaseConfig)

export const firebase = initializeApp(firebaseConfig)

const app = createApp(App)

app.use(router)

app.mount('#app')
