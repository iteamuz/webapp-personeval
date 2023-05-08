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
  }
]


const router = createRouter({
  mode: 'history',
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})


// router.beforeEach((to, from) => {
//   const auth = localStorage.getItem('token');

//   if (auth && to.name == 'signup') {
//     return { name: 'home' };
//   }


//   if (!auth && to.meta.needLogin) {
//     return { name: 'signup' }
//   }
// });

export default router
