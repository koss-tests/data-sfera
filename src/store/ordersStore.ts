import { getMockOrdersData } from '@shared/mock'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IOrder } from '@shared/types'

const useOrdersStore = defineStore('OrdersStore', () => {
  /*#region STATE*/
  const isOrdersDataLoading = ref<boolean>(false)

  const ordersData = ref<IOrder[]>([])
  /*#endregion STATE*/

  /*#region ACTIONS*/
  const getOrdersData = async () => {
    try {
      isOrdersDataLoading.value = true

      const response = await getMockOrdersData()

      response.data.map((item) => {
        item.date = new Date(item.date)
      })

      ordersData.value = response.data
    } catch (err: unknown) {
      console.error(err)
    } finally {
      isOrdersDataLoading.value = false
    }
  }
  /*#endregion ACTIONS*/

  return {
    isOrdersDataLoading,
    ordersData,
    getOrdersData
  }
})

export default useOrdersStore
