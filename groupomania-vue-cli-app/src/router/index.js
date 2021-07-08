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
  {
    path: '/forum',
    name: 'Forum',
    component: () => import('../components/Forum'),
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../components/News'),
  },
  {
    path: '/myAccount',
    name: 'MyAccount',
    component: () => import('../components/MyAccount'),
  },
  {
    path: '/myAccount/delete',
    name: 'DeleteAccount',
    component: () => import('../components/DeleteAccount'),
  },
  {
    path: '/sujet/:idCanal',
    name: 'SujetList',
    component: () => import('../components/SujetList'),
  },
  {
    path: '/sujet/:idCanal/:idSujet',
    name: 'Sujet',
    component: () => import('../components/Sujet'),
  },
  {
    path: '/sujet/:idCanal/create',
    name: 'SujetCreate',
    component: () => import('../components/SujetCreate'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router