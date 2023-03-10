<script>
import { auth } from '../main';
import MultiSelect from '@vueform/multiselect';
import {db} from '../main'
import { ref, set } from "firebase/database";
import router from '../router';


export default {
    components: {MultiSelect},
    data () {
        return {
            name: "",
            selectedGrade: "",
            hasDoneG4: "",
            scienceClasses: null,
            studentRequest: "",
            options: ["IB Bio", "IB Physics", "IB Comp Sci", "IB Chemistry", "IB Sports Sci"]
        }
    },
    methods: {
        formFilledOut(){
            if(this.scienceClasses != null && this.name != "" && this.selectedGrade != "" &&  this.studentRequest != "" && this.hasDoneG4 != ""){
                return false;
            }
            return true;
        },
        submitForm(){
            console.log("form submitted");
            set(ref(db, 'students/' + this.name ), {
                grade: this.selectedGrade,
                hasExperience: this.hasDoneG4,
                classes: this.scienceClasses,
                requestedStudent: this.studentRequest
            });
            this.name = "";
            this.selectedGrade = "";
            this.hasDoneG4 = "";
            this.scienceClasses = null;
            this.studentRequest = "";
            router.push('/');
            alert("thank you for submitting a response!");
        }
    }
}
</script>

<template>
    <div id = "container">
        <div id = "form">
            <div class="studentForm">
                <form @submit.prevent="submitForm">
                    <h1 id="title">Student Form</h1>
                    <input class="inputFields"
                    type="text" 
                    placeholder="Full name"
                    v-model="name"
                    />
                    <br/>
                    <div id="selector">
                        <label for="grade" class="gradeHeader regular-font">Choose your grade level:</label>
                        <select v-model="selectedGrade">
                            <option value=""></option>
                            <option value="11">11th</option>
                            <option value="12">12th</option>
                        </select>
                    </div>
                    <div id="selector">
                        <label for="pastExperience" class="gradeHeader regular-font">Have you completed a G4 project in the past?</label>
                        <select v-model="hasDoneG4" id="pastExp">
                            <option value=""></option>
                            <option value="yes">yes</option>
                            <option value="no">no</option>
                        </select>
                    </div>
                    <div id="selector">
                        <label class="typo__label regular-font">Select all current IB science classes you are taking</label>
                        <MultiSelect v-model="scienceClasses" mode="multiple" :close-on-select="false" :options="options" class="regular-font">
                        </MultiSelect>
                        <!-- <pre class="language-json"><code>{{ scienceClasses  }}</code></pre> -->
                    </div>
                    <input class="inputFields" id="request"
                    type="text" 
                    placeholder="Student name"
                    v-model="studentRequest"
                    />
                    <br /> <br /> <br />
                    <button type="submit" :disabled="formFilledOut()">
                        Submit
                    </button>
                    <p id="formInstructions" class="regular-font">{{!formFilledOut() ? "" : "Please fill out form completely"}}</p>
                </form>
            </div>
        </div>
    </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.inputFields {
    font-family: Inter;
    font-size: 1.25vw;
    margin-left: 5vw;
    margin-top: 3vh;
    border-radius: 0.3vw;
}
#request {
    margin-top: 10vw;
}
#title {
    margin-left: 5vw;
}
#selector {
    margin-left: 5vw;
    margin-top: 2vh;
    padding-bottom: 0vh;
    height: 25px;
}
form {
    margin-top: 20vh;
}
select {
    font-family: Inter;
    font-size: 1.25vw;
    margin-left: 3vw;
    margin-bottom: 3vh;
    border-radius: 0.3vw;
}
#formInstructions{
    width: fit-content;
    margin-left: 5vw;
}
#container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #E5E5E5;
    align-items: center;
}
.gradeHeader {
}
#pastExp {

}
#form {
    margin-left: 20vw;
    width: 60vw;
    height: 100vh;
    background-color: #FCF6E7;
    overflow: hidden;
}
.studentForm {
    /* border: 5px solid black; */
    margin-top: 5vh;
    margin-left: 2.5vw;
    height: 90vh;
    width: 55vw;
}
.regular-font{
    font-family: Inter;
    font-size: 1.25vw;
}

button {
    margin-left: 5vw;
    font-family: Inter;
    font-size: 1.25vw;
    border-radius: 0.3vw;
    margin-bottom: 1vh;
    background-color: green;
}
</style>