import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  }
]


const router = createRouter({
  mode: 'history',
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
