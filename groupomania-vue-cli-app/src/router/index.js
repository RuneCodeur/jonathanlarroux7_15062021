import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  
  {
    path: '/',
    name: 'Connexion',
    component: () => import('../components/Connexion'),
  },
  {
    path: '/inscription',
    name: 'Inscription',
    component: () => import('../components/Inscription'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
