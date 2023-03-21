<template>
    <div id="container">
        <form @submit.prevent="register" id="form">
            <h2 id="regTitle">Register</h2>
            <input
                id="emailInput"
                type="email"
                placeholder="Email address..."
                v-model="email"
            />
            <input
                id="passwordInput"
                type="password"
                placeholder="password..."
                v-model="password"
            />
            <button type="submit" id="registerButton">Register</button>
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
            if(this.email != "vonbargeng@issaquah.wednet.edu"){
                alert("only teachers are allowed to register an account.");
            } else {
                if(this.password != "vonbargen"){
                    alert("password incorrect for the teacher registration");
                } else {
                    createUserWithEmailAndPassword(auth, this.email, this.password);
                    console.log(auth.currentUser);
                    alert("You are signed in!");
                    router.push('/TeacherDashboard');
                }
            }
        }
    }

}
</script>

<style>
#registerButton {
    display: block;
    margin-top: 2vh;
}
#regTitle {
    margin-top: 40vh;
    text-align: center;
}
input {
    text-align: center;
    
}
#form { 

    display: flex;
    flex-direction: column;
    align-items: center;
}
#container {
    background-color: rgb(129, 186, 128);
    width: 100vw;
    height: 100vh;
}
#emailInput {
    display: block;  
    width: 15vw;
    margin-top: 0.2vh;
    border-radius: 2vw;
}
#passwordInput {
    width: 15vw;
    margin-top: 1vh;
    border-radius: 2vw;
    display: block;
    text-align: center;
}
</style>

