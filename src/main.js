import { createApp } from 'vue'
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";
import {firebaseConfig} from '../firebaseConfig.js'
import App from './App.vue'
import router from './router'

export const firebaseApp = initializeApp(firebaseConfig);//an instance of firebase - used later

export const auth = getAuth(firebaseApp);//an instance of the firebase authentication for this web app

export const db = getDatabase(firebaseApp);//an instance of the firebase database for this web app

const app = createApp(App)

app.use(router) //inserts Vue Router into the web app

app.mount('#app')

