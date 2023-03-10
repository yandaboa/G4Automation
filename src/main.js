import { createApp } from 'vue'
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";
import {firebaseConfig} from '../firebaseConfig.js'
import App from './App.vue'
import router from './router'
// import Multiselect from 'vue-multiselect'

// firebase.initializeApp(firebaseConfig)
export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const db = getDatabase(firebaseApp);
// console.log(db);

// export const auth = getAuth()

const app = createApp(App)

app.use(router)

app.mount('#app')
