import { createRouter, createWebHistory } from 'vue-router'
// import { getAuth } from "firebase/auth"
import StudentForm from '../views/StudentForm.vue'
import TeacherLogin from '../views/TeacherLogin.vue'
import TeacherDashboard from '../views/TeacherDashboard.vue'
import Register from '../views/Register.vue'
import HomePage from '../views/HomePage.vue'
import { auth } from '../main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ //every page in this web app - easily and quickly loaded when the 'path' is attached to the end of the url.
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

router.beforeEach((to, from) => { //runs every time a new page is navigated to
  //this if statement only allows for three pages if the user is not logged in - Home, TeacherLogin, StudentForm
  if((to.name !== 'TeacherLogin' && to.name !== 'StudentForm' && to.name !== 'Register') && auth.currentUser === null){
    if(to.name != 'Home'){ //makes sure there is no infinite redirecting
      return {name: 'Home'};
    }
  }
  //if the user tries to go to TeacherLogin while already logged in, it redirects to the Dashboard
  if ((to.name === 'TeacherLogin' || to.name === 'Register') && auth.currentUser != null) {
    return {name: 'Dashboard' };
  }
})

export default router

