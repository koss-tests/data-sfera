<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Filler,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  type CoreChartOptions
} from 'chart.js'
import { getCssVariable } from '@/shared/utils'
import type { ISale } from '@shared/types'

ChartJS.register(CategoryScale, Filler, Tooltip, Legend, PointElement, LineElement, LinearScale)

const { data } = defineProps<{
  data: ISale[]
}>()

// Данные для Line Chart (продажи по дням)
const dailySales = computed(() => {
  const days: Record<string, number> = {}
  data.forEach((sale) => {
    const day = sale.date
    days[String(day)] = (days[String(day)] || 0) + parseFloat(sale.total_price)
  })
  return Object.entries(days).map(([date, amount]) => ({ date, amount }))
})

const chartData = {
  labels: dailySales.value.map((d) => {
    const date = new Date(d.date)
    return date.toLocaleDateString('ru-RU')
  }),
  datasets: [
    {
      label: 'Выручка (руб)',
      data: dailySales.value.map((d) => d.amount),
      borderColor: getCssVariable('--p-primary-400') ?? '#4f46e5',
      tension: 0.3,
      fill: true,
      backgroundColor: getCssVariable('--p-primary-950') ?? 'rgba(79, 70, 229, 0.1)'
    }
  ]
}

const chartOptions: Partial<CoreChartOptions<'line'>> = {
  responsive: true
}
</script>

<template>
  <div class="chart-container">
    <h3>Динамика продаж по дням</h3>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
