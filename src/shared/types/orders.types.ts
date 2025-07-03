export interface IOrder {
  g_number: string
  date: Date | string
  last_change_date: Date | string
  supplier_article: string
  tech_size: string
  barcode: number
  total_price: string
  discount_percent: number
  warehouse_name: string
  oblast: string
  income_id: number
  odid: string
  nm_id: number
  subject: string
  category: string
  brand: string
  is_cancel: boolean
  cancel_dt: Date | string | null
}
