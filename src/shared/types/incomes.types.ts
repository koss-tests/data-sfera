export interface IIncome {
  income_id: number
  number: string
  date: Date | string
  last_change_date: Date | string
  supplier_article: string
  tech_size: string
  barcode: number
  quantity: number
  total_price: string
  date_close: Date | string
  warehouse_name: string
  nm_id: number
  id?: number
}
