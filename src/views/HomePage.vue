<script setup>
</script >

<template>
    <div id="container">
        <router-link to="/TeacherLogin">
            <div id = "teacher_login">
                <p class = "sectionTitle">Teacher Login</p>
            </div>
        </router-link>
        <router-link to="/StudentForm">
            <div id = "student_form">
                <p class="sectionTitle">Student Form</p>
            </div>
        </router-link>
    </div>
</template>

<style scoped>
#container {
    width: 100vw;
    height: 100vh;
    flex: auto;
}

#teacher_login {
    width: 50%;
    height: 100%;
    object-fit: cover;
    display: inline-block;
    background-image: url(src/assets/19201080ssss.jpeg);
    opacity: 75%;
    text-align: center;
}

#student_form {
    width: 50%;
    height: 100%;
    object-fit: cover;
    display: inline-block;
    background-image: url(src/assets/GrandCanyonNationalPark-2020-GettyImages-858637934.jpg.webp);
    opacity: 75%;
    text-align: center;
    /* vertical-align: middle; */
}
.sectionTitle {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 5vh;
    padding-top: 45vh;
    /* position: absolute; */
    /* top: 50%; */
    /* left: 50%; */
    /* line-height: 77px; */

    color: #FFFFFF;
}

/* .bckgroundPic{
    max-width: 100%;
    max-height: 100%;
} */
</style>