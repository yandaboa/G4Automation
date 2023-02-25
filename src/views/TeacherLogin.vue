<script setup>
</script>

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
            </div>
        </div>
    </div>
</template>

<style scoped>
.loginFields {
    font-family: Inter;
    font-size: 1vw;
    margin-left: 28vw;
    margin-bottom: 5vh;
    border-radius: 0.3vw;
}
button {
    margin-left: 33vw;
    font-size: 1vw;
    border-radius: 0.3vw;
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
}
</style>