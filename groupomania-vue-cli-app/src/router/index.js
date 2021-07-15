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
    path: '/welcome',
    name: 'Welcome',
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
    path: '/sujet/:idForum',
    name: 'SujetList',
    component: () => import('../components/SujetList'),
  },
  {
    path: '/sujet/:idForum/:idSujet',
    name: 'Sujet',
    component: () => import('../components/Sujet'),
  },
  {
    path: '/sujet/:idForum/create',
    name: 'SujetCreate',
    component: () => import('../components/SujetCreate'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router