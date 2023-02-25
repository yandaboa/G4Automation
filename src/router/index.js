import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import StudentForm from '../views/StudentForm.vue'
import TeacherLogin from '../views/TeacherLogin.vue'


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
    }
  ]
})

export default router
