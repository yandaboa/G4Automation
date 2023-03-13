

<template>
    <div class="screen">
        <div class="container">
            <h1 id="title">Teacher Dashboard</h1>
            <div id="basicButtons">
                <button type="button" id="getGroups" @click="getGroups">
                    Get Groups
                </button>
                <button type="button" id="editGroups" @click="toggleDeleteAllConfrim">
                    Delete Students
                </button>
                <button type="button" id="signOut" @click="toggleSignoutDialogue">
                    Sign Out
                </button>
                <div v-if="this.showDeleteAllConfirm" id="deleteAllConfirmDialogue">
                    <p>Are you sure you want to delete all student data?</p>
                    <button @click="deleteStudents" class="inDialogue">Yes</button>
                    <button @click="toggleDeleteAllConfrim" class="inDialogue">No</button>
                </div>
                <div v-if="this.showSignoutConfirm" id="signoutConfirmDialogue">
                    <p>Are you sure you want to signout?</p>
                    <button @click="signOut" class="inDialogue">Yes</button>
                    <button @click="toggleSignoutDialogue" class="inDialogue">No</button>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
    #deleteAllConfirmDialogue {
        /* margin-top: 10vh;
        width: 25vw;
        text-align: right; */
    }
    #signoutConfirmDialogue {
        text-align: right;
        margin-right: 5vw;
    }
    button {
        background-color: rgb(114, 114, 180);
    }
    .inDialogue {
        margin-right: 5vw;
    }
    #getGroups {
        margin-top: 12.5vh;
        height: 5vh;
        width: 10vw;
        margin-right: 10vw;
    }
    #basicButtons {
        /* border: black solid 5px; */
        height: 80vh;
    }
    #title {
        margin-top: 25vh;
        /* margin-left: 10vw; */
    }
    #editGroups {
        margin-top: 12.5vh;
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
        margin-top: 12.5vh;
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
import { ref, set } from '@firebase/database';
import { auth, db } from '../main';
import {makeGroups} from '../groupMaker';
import router from '../router/index';

export default {
    data () {
        return {
            showSignoutConfirm: false,
            showDeleteAllConfirm: false
        }
    },
    methods: {
        getGroups() {
            makeGroups();
            console.log("getting all groups");
            // alert("works");
        },
        signOut() {
            signOut(auth);
            console.log(auth.currentUser);
            router.push('/');
        },
        deleteStudents () {
            set(ref(db, 'students/'), {});
            console.log("deleted all the students oh no");
        },
        toggleSignoutDialogue () {
            this.showSignoutConfirm = !this.showSignoutConfirm;
            this.showDeleteAllConfirm = false;
        },
        toggleDeleteAllConfrim () {
            this.showDeleteAllConfirm = !this.showDeleteAllConfirm;
            this.showSignoutConfirm = false;
        }
    }
}

</script>