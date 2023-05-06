import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUpView.vue')
  }
]


const router = createRouter({
  mode: 'history',
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
