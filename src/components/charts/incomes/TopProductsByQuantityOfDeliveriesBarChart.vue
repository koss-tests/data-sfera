<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  type CoreChartOptions
} from 'chart.js'
import { getCssVariable } from '@/shared/utils'
import type { IIncome } from '@shared/types'

ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { data } = defineProps<{
  data: IIncome[]
}>()

const primaryColor = computed(() => getCssVariable('--p-primary-400') ?? 'green')

// Группируем товары по supplier_article и суммируем quantity
const topProductsData = computed(() => {
  const groups: Record<string, number> = {}
  data.forEach((item: any) => {
    const article = item.supplier_article
    groups[article] = (groups[article] || 0) + item.quantity
  })

  // Преобразуем в массив и сортируем по убыванию
  return Object.entries(groups)
    .map(([supplier_article, totalQuantity]) => ({
      supplier_article,
      totalQuantity
    }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
    .slice(0, 5) // Топ-5 товаров
})

const topProductsСhartData = computed(() => ({
  labels: topProductsData.value.map((item: any) => item.supplier_article),
  datasets: [
    {
      label: 'Количество',
      backgroundColor: primaryColor.value,
      data: topProductsData.value.map((item: any) => item.totalQuantity)
    }
  ]
}))

const topProductsChartOptions: Partial<CoreChartOptions<'bar'>> = {
  indexAxis: 'y',
  responsive: true
}
</script>

<template>
  <div class="chart-container">
    <h3>Топ-5 товаров по количеству поставок</h3>
    <Bar :data="topProductsСhartData" :options="topProductsChartOptions" />
  </div>
</template>
