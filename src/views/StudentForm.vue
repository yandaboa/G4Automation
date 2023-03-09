<script>
import { auth } from '../main';
import { ref } from 'vue';
import MultiSelect from 'vue-multiselect';

export default {
    components: {MultiSelect},
    data () {
        return {
            name: "",
            selectedGrade: "",
            hasDoneG4: "",
            scienceClasses: null,
            options: ["IB Bio", "IB Physics", "IB Comp Sci", "IB Chemistry", "IB Sports Sci"]
        }
    },
    methods: {
        formFilledOut(){
            if(this.scienceClasses.length > 0 && name.value != "" && grade.value != "" && studentRequest.value != "" && hasDoneG4 != ""){
                return false;
            }
            return true;
        },
        submitForm(){
            console.log(this.name);
            console.log(this.selectedGrade);
            console.log(this.hasDoneG4);
        }
    }
}
</script>

<template>
    <div id = "container">
        <div id = "form">
            <div class="studentForm">
                <form @submit.prevent="submitForm">
                    <input class="inputFields"
                    type="text" 
                    placeholder="Full name..."
                    v-model="name"
                    />
                    <label for="grade" class="gradeHeader">Choose your grade level:</label>
                    <select v-model="selectedGrade" id="cars">
                        <option value=""></option>
                        <option value="11">11th</option>
                        <option value="12">12th</option>
                    </select>
                    <label for="pastExperience" class="gradeHeader">Have you completed a G4 project in the past?</label>
                    <select v-model="hasDoneG4" id="pastExp">
                        <option value=""></option>
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                    </select>
                    <div>
                        <label class="typo__label">Simple select / dropdown</label>
                        <multiselect v-model="scienceClasses"  :options="options">
                        </multiselect>
                        <!-- <pre class="language-json"><code>{{ scienceClasses  }}</code></pre> -->
                    </div>
                    <button type="submit" :disabled="formFilledOut">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.inputFields {
    font-family: Inter;
    font-size: 1vw;
    margin-left: 28vw;
    margin-bottom: 3vh;
    border-radius: 0.3vw;
}
select {
    font-family: Inter;
    font-size: 1vw;
    margin-left: 28vw;
    margin-bottom: 3vh;
    border-radius: 0.3vw;
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
#form {
    margin-left: 20vw;
    width: 60vw;
    height: 100vh;
    background-color: #FCF6E7;
    overflow: hidden;
}
.studentForm {
    border: 5px solid black;
    margin-top: 5vh;
    margin-left: 2.5vw;
    height: 90vh;
    width: 55vw;
}
button {
    margin-left: 33vw;
    font-size: 1vw;
    border-radius: 0.3vw;
    margin-bottom: 2vh;
    background-color: green;
}
</style>