<template>
    <div id="container">
        <form @submit.prevent="register">
        <h2>Register</h2>
        <input
            type="email"
            placeholder="Email address..."
            v-model="email"
        />
        <input
            type="password"
            placeholder="password..."
            v-model="password"
        />
        <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import { createUserWithEmailAndPassword, signOut } from '@firebase/auth';
import { auth } from '../main';
import router from '../router';

export default {
    data () {
        return {
            password: '',
            email: ''
        }
    },
    methods: {
        register() {
            createUserWithEmailAndPassword(auth, this.email, this.password);
            console.log(auth.currentUser);
        }
    }

}
</script>

<style>
#container {
    background-color: rgb(129, 186, 128);
    width: 100vw;
    height: 100vh;
}
</style>

