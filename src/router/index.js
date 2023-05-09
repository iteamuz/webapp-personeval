import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { needLogin: true }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUpView.vue')
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


router.beforeEach((to, from) => {
  const auth = localStorage.getItem('token');

  if (auth && to.name == 'signup' || auth && to.name == 'login') {
    return { name: 'home' };
  }


  if (!auth && to.meta.needLogin) {
    return { name: 'login' }
  }
});

export default router
