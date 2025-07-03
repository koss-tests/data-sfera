<script setup lang="ts">
import useAppStore from '@store/index'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { isSidebarVisible } = storeToRefs(appStore)

const pt = {
  root: {
    style: {
      border: 'none'
    }
  },
  content: {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '.5rem'
    }
  }
}

const pages = [
  { routeName: 'incomes', title: 'Доходы' },
  { routeName: 'orders', title: 'Заказы' },
  { routeName: 'sales', title: 'Продажи' },
  { routeName: 'stocks', title: 'Склады' }
]
</script>

<template>
  <Drawer v-model:visible="isSidebarVisible" header="Меню" :pt>
    <RouterLink
      v-for="page of pages"
      :to="{ name: page.routeName }"
      active-class="active"
      @click="appStore.toggleSidebar"
      class="sidebar-link"
      >{{ page.title }}</RouterLink
    >
  </Drawer>
</template>

<style scoped>
.sidebar-link {
  padding: 0.25rem 1rem;
  border: 1px solid transparent;
  color: var(--p-text);
  text-decoration: none;

  &.active,
  &:hover {
    color: var(--p-surface-0);
    border: 1px solid var(--p-primary-400);
    border-radius: 0.5rem;
  }

  &:hover:not(.active) {
    color: var(--p-primary-400);
  }

  &.active {
    background-color: var(--p-primary-400);
    font-weight: 700;
  }
}
</style>
