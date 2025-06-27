import { defineStore } from 'pinia'

const useAppStore = defineStore('AppStore', () => {
  const apiKey = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'

  return { apiKey }
})

export default useAppStore
