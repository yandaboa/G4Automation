import { createApp } from 'vue'
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import {firebaseConfig} from '../firebaseConfig.js'
import App from './App.vue'
import router from './router'

// firebase.initializeApp(firebaseConfig)
initializeApp(firebaseConfig)

export const auth = getAuth();

// export const auth = getAuth()

const app = createApp(App)

app.use(router)

app.mount('#app')
