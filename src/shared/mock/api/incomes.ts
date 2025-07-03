import { incomesData } from '../data/incomes'
import type { IApiData, IIncome } from '@shared/types'

export const getMockIncomesData = async (timeout: number = 1000) => {
  return new Promise<IApiData<IIncome>>((resolve) => {
    setTimeout(() => {
      resolve(incomesData)
    }, timeout)
  })
}
