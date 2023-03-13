

<template>
    <div class="screen">
        <div class="container">
            <h1 id="title">Teacher Dashboard</h1>
            <div id="basicButtons">
                <button type="button" id="getGroups" @click="getGroups">
                    Get Groups
                </button>
                <button type="button" id="editGroups" @click="deleteStudents">
                    Delete Students
                </button>
                <button type="button" id="signOut" @click="toggleSignoutDialogue">
                    Sign Out
                </button>
                <div v-if="this.showSignoutConfirm" id="confirmDialogue">
                    <p>Are you sure you want to signout?</p>
                    <button @click="signOut" class="inDialogue">Yes</button>
                    <button @click="toggleSignoutDialogue" class="inDialogue">No</button>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
    button {
        background-color: rgb(114, 114, 180);
    }
    #getGroups {
        margin-top: 32.5vh;
        height: 5vh;
        width: 10vw;
        margin-right: 10vw;
    }
    #basicButtons {
        /* border: black solid 5px; */
        height: 80vh;
    }
    #title {
        margin-top: 0vh;
        margin-left: 10vw;
    }
    #editGroups {
        margin-top: 32.5vh;
        height: 5vh;
        width: 10vw;
        margin-right: 10vw;
    }
    .screen {
        background-color: #94b384;
        height: 100vh;
        width: 100vw;
        
    }
    #signOut {
        margin-top: 32.5vh;
        height: 5vh;
        width: 10vw;
    }
    .container {
        text-align: center;
        background-color: rgb(196, 211, 211);
        height: 100vh;
        width: 70vw;
        margin-left: 15vw;
        overflow: hidden;
    }
</style>

<script>
// import { db } from '../main';

import { signOut } from '@firebase/auth';
import { auth } from '../main';
import router from '../router/index';

export default {
    data () {
        return {
            showSignoutConfirm: false
        }
    },
    methods: {
        getGroups() {
            console.log("getting all groups");
            alert("works");
        },
        signOut() {
            signOut(auth);
            console.log(auth.currentUser);
            router.push('/');
        },
        deleteStudents () {
            console.log("deleted all the students oh no");
        },
        toggleSignoutDialogue () {
            this.showSignoutConfirm = !this.showSignoutConfirm;
        }
    }
}

</script>