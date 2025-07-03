import { ordersData } from '../data/orders'
import type { IApiData, IOrder } from '@shared/types'

export const getMockOrdersData = async (timeout: number = 1000) => {
  return new Promise<IApiData<IOrder>>((resolve) => {
    setTimeout(() => {
      resolve(ordersData)
    }, timeout)
  })
}
