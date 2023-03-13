import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/word-chain-game',
      name: 'home',
      component: () => import('@/views/WordChainGame.vue')
    }
  ]
})

export default router
