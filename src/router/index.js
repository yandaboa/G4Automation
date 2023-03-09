import { createRouter, createWebHistory } from 'vue-router'
// import { getAuth } from "firebase/auth"
import HomePage from '../views/HomePage.vue'
import StudentForm from '../views/StudentForm.vue'
import TeacherLogin from '../views/TeacherLogin.vue'
import TeacherDashboard from '../views/TeacherDashboard.vue'
import Register from '../views/Register.vue'
import { auth } from '../main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/StudentForm',
      name: 'form for students',
      component: StudentForm
    },
    {
    path: '/TeacherLogin',
    name: 'teacher login page',
    component: TeacherLogin
  },
  {
    path: '/TeacherDashboard',
    name: 'Dashboard',
    component: TeacherDashboard
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  }
]
})

router.beforeResolve(async to => {
  if (to.name == "TeacherLogin") {
    console.log("executing router");
    if(auth.currentUser != null){
      return { name: 'TeacherDashboard'};
    }
    return {name: "TeacherLogin"};
  }
})

export default router