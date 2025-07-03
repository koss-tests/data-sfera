export interface ISale {
  g_number: string
  date: Date | string
  last_change_date: Date | string
  supplier_article: string
  tech_size: string
  barcode: number
  total_price: string
  discount_percent: string
  is_supply: boolean
  is_realization: boolean
  promo_code_discount: unknown
  warehouse_name: string
  country_name: string
  oblast_okrug_name: string
  region_name: string
  income_id: number
  sale_id: string
  odid: unknown
  spp: string
  for_pay: string
  finished_price: string
  price_with_disc: string
  nm_id: number
  subject: string
  category: string
  brand: string
  is_storno: unknown
}
