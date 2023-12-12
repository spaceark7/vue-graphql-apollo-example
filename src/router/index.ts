import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: 'episodes',
          name: 'episodes',
          component: () => import('@/views/EpisodesView.vue')
        },
        {
          path: 'locations',
          name: 'locations',
          component: () => import('@/views/LocationsView.vue')
        }
      ]
    }
  ]
})

export default router
