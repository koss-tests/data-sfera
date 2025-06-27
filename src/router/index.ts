import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'incomes',
      component: () => import('@pages/IncomesPage.vue'),
    },
    {
      path: '/',
      name: 'orders',
      component: () => import('@pages/OrdersPage.vue'),
    },
    {
      path: '/',
      name: 'sales',
      component: () => import('@pages/SalesPage.vue'),
    },
    {
      path: '/',
      name: 'stocks',
      component: () => import('@pages/StocksPage.vue'),
    },
  ],
})

export default router
