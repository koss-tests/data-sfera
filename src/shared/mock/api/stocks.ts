import { stocksData } from '../data/stocks'
import type { IApiData, IStock } from '@shared/types'

export const getMockStocksData = async (timeout: number = 1000) => {
  return new Promise<IApiData<IStock>>((resolve) => {
    setTimeout(() => {
      resolve(stocksData)
    }, timeout)
  })
}
