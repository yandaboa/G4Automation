
<template>
    <div id = "container">
        <div id = "loginForm">
            <div id = "formTitle">
                <p>Teacher Login</p>
            </div>
            <div>
                <form @submit.prevent="login" >
                    <input class = "loginFields"  
                    type="email"       
                    placeholder="Email address..."       
                    v-model="email"     
                    />     
                    <input class = "loginFields"
                    type="password"       
                    placeholder="Password..."       
                    v-model="password"     
                    />     
                    <button type="submit">
                    Login
                    </button>   
                </form> 
                <router-link to="/Register" class="newAccountButton">
                    <p >Create a new account</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.loginFields {
    font-family: Inter;
    font-size: 1vw;
    margin-left: 28vw;
    margin-bottom: 3vh;
    border-radius: 0.3vw;
}
.newAccountButton {
    flex: auto;
    justify-self: center;
    text-align: center;
}
button {
    margin-left: 33vw;
    font-size: 1vw;
    border-radius: 0.3vw;
    margin-bottom: 2vh;
}
#formTitle {
    font-family: Inter;
    font-size: 3vw;
    font-weight: 400;
    /* line-height: 77px; */
    letter-spacing: 0em;
    text-align: center;
    padding-top: 30vh;
}
#container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #94b384;
}
#loginForm {
    width: 70vw;
    height: 100vh;
    margin-left: 15vw;
    background-color: rgb(196, 211, 211);
    /* flex: auto; */
    /* justify-content: center; */
}
</style>

<script setup>
import { ref } from "vue";
import { auth } from "../main.js";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "@firebase/auth";
// import { loginBackend } from "../backend";
const email = ref("");
const password = ref("");
const router = useRouter();

const login = () => {
    // if(auth.currentUser != null){
    //     alert("already logged in!");
    //     router.push("/TeacherDashboard");
    //     return;
    // }
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        const user = userCredential.user;
        router.push("/TeacherDashboard");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
}

</script>