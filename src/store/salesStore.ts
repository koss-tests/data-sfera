import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMockSalesData } from '@shared/mock'
import type { ISale } from '@shared/types'

const useSalesStore = defineStore('SalesStore', () => {
  /*#region STATE*/
  const isSalesDataLoading = ref<boolean>(false)

  const salesData = ref<ISale[]>([])
  /*#endregion STATE*/

  /*#region ACTIONS*/
  async function getSalesData() {
    try {
      isSalesDataLoading.value = true

      const response = await getMockSalesData()

      response.data.map((data: any) => {
        // Конвертируем String в Date для того чтобы корректно работала сортировка и фильтрация
        data.date = new Date(data.date)
      })

      salesData.value = response.data.sort(
        (a: any, b: any) => a.date.getTime() - b.date.getTime()
      ) as any[]
    } catch (err: unknown) {
      console.error(err)
    } finally {
      isSalesDataLoading.value = false
    }
  }
  /*#endregion ACTIONS*/

  return {
    isSalesDataLoading,
    salesData,
    getSalesData
  }
})

export default useSalesStore
