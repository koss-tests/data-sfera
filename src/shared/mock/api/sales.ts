import { salesData } from '../data/sales'
import type { IApiData, ISale } from '@shared/types'

export const getMockSalesData = async (timeout: number = 1000) => {
  return new Promise<IApiData<ISale>>((resolve) => {
    setTimeout(() => {
      resolve(salesData)
    }, timeout)
  })
}
