import { createRouter, createWebHistory } from 'vue-router'
// import { getAuth } from "firebase/auth"
import HomePage from '../views/HomePage.vue'
import StudentForm from '../views/StudentForm.vue'
import TeacherLogin from '../views/TeacherLogin.vue'
import TeacherDashboard from '../views/TeacherDashboard.vue'
import Register from '../views/Register.vue'
import { auth } from '../main'
// import { auth } from '../main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/StudentForm',
      name: 'StudentForm',
      component: StudentForm
    },
    {
    path: '/TeacherLogin',
    name: 'TeacherLogin',
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

router.beforeEach((to, from) => {
  if((to.name !== 'TeacherLogin' && to.name !== 'StudentForm') && auth.currentUser === null){
    if(to.name != 'Home'){
      return {name: 'Home'};
    }
  }
  if (to.name === 'TeacherLogin' && auth.currentUser != null) {
    return {name: 'Dashboard' };
  }
})

export default router