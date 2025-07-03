import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMockStocksData } from '@shared/mock'
import type { IStock } from '@shared/types'

const useStocksStore = defineStore('StocksStore', () => {
  /*#region STATE*/
  const isStocksDataLoading = ref<boolean>(false)

  const stocksData = ref<IStock[]>([])
  /*#endregion STATE*/

  /*#region ACTIONS*/
  async function getStocksData() {
    try {
      isStocksDataLoading.value = true

      const response = await getMockStocksData()

      stocksData.value = response.data
    } catch (err: unknown) {
      console.error(err)
    } finally {
      isStocksDataLoading.value = false
    }
  }
  /*#endregion ACTIONS*/
  return {
    isStocksDataLoading,
    stocksData,
    getStocksData
  }
})

export default useStocksStore
