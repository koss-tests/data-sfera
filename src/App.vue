<script setup lang="ts">
import useAppStore from '@store/index'
import Sidebar from '@components/Sidebar.vue'

const appStore = useAppStore()

const pt = {
  root: {
    class: 'menu-btn',
  },
}
</script>

<template>
  <Button
    icon="pi pi-bars"
    size="small"
    severity="secondary"
    rounded
    aria-label="Star"
    @click="appStore.toggleSidebar"
    :pt
  />
  <Sidebar />
  <router-view />
</template>

<style lang="scss" scoped>
.menu-btn {
  position: fixed;
  top: 1rem;
  left: 1rem;
}
</style>
