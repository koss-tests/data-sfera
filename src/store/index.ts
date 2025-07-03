import { defineStore } from 'pinia'
import { ref } from 'vue'

const useAppStore = defineStore('AppStore', () => {
  const apiKey = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'
  const isSidebarVisible = ref<boolean>(false)

  function toggleSidebar() {
    isSidebarVisible.value = !isSidebarVisible.value
  }

  return { apiKey, isSidebarVisible, toggleSidebar }
})

export default useAppStore
