<template>
    <div>
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

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, signOut } from '@firebase/auth';
import { useRouter } from 'vue-router';
import { auth } from '../main';
const password = ref('');
const email = ref('');
const router = useRouter();

const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Successfully registered!");
            signOut(auth);
            router.push("/TeacherLogin");
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        })

};

</script>