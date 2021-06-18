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
    path: '/thread',
    name: 'Threadlist',
    component: () => import('../components/ThreadList'),
  },
  {
    path: '/sujet/123',
    name: 'Thread',
    component: () => import('../components/Thread'),
  },
  {
    path: '/sujet/new',
    name: 'newSujet',
    component: () => import('../components/NewSujet'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
