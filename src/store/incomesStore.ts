import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMockIncomesData } from '@shared/mock'

export const useIncomesStore = defineStore('IncomesStore', () => {
  /*#region STATE*/
  const isIncomesDataLoading = ref<boolean>(false)

  const incomesData = ref<any[]>([])
  /*#endregion STATE*/

  /*#region ACTIONS*/
  const getIncomesData = async () => {
    try {
      isIncomesDataLoading.value = true
      // const response = await fetch(
      //   'http://109.73.206.144:6969/api/incomes?dateFrom=2025-05-01&dateTo=2025-06-01&page=1&key=E6kUTYrYwZq2tN4QEtyzsbEBk3ie',
      //   {
      //     method: 'GET',
      //   }
      // )

      const response = await getMockIncomesData()

      // const result = await response.json()

      response.data.map((income: any, idx: number) => {
        // Уникальный ID для ключей в таблице
        income.id = idx + 1
        // Конвертируем String в Date для того чтобы корректно работала сортировка и фильтрация
        income.date_close = new Date(income.date_close)
      })

      // Сортировка данных по возростанию даты
      incomesData.value = response.data.sort(
        (a: any, b: any) => a.date_close.getTime() - b.date_close.getTime()
      )
    } catch (err: unknown) {
      console.error(err)
    } finally {
      isIncomesDataLoading.value = false
    }
  }
  /*#endregion ACTIONS*/

  return {
    isIncomesDataLoading,
    incomesData,
    getIncomesData
  }
})

export default useIncomesStore
