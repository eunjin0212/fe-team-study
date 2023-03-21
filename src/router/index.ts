import { createRouter, createWebHistory } from 'vue-router'
export const routes = [
  {
    path: '/word-chain-game',
    name: 'WordChain',
    component: () => import('@/views/WordChainGame.vue')
  },
  {
    path: '/lotto-game',
    name: 'Lotto',
    component: () => import('@/views/Lotto.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, 
})

export default router
