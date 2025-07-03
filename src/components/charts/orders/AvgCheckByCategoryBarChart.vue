<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { getCssVariable } from '@/shared/utils'
import type { IOrder } from '@shared/types'

ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { data } = defineProps<{
  data: IOrder[]
}>()

// Средний чек по категориям
const avgCheckByCategory = computed(() => {
  const categoryStats: Record<string, { sum: number; count: number }> = {}

  data.forEach((order) => {
    if (!order.is_cancel) {
      const amount = parseFloat(order.total_price)
      if (!categoryStats[order.category]) {
        categoryStats[order.category] = { sum: 0, count: 0 }
      }
      categoryStats[order.category].sum += amount
      categoryStats[order.category].count++
    }
  })

  return Object.entries(categoryStats)
    .map(([category, stats]) => ({
      category,
      avg: Math.round(stats.sum / stats.count)
    }))
    .sort((a, b) => b.avg - a.avg)
})

const chartData = {
  labels: avgCheckByCategory.value.map((c) => c.category),
  datasets: [
    {
      label: 'Средний чек (руб)',
      data: avgCheckByCategory.value.map((c) => c.avg),
      backgroundColor: getCssVariable('--p-primary-400') ?? 'green',
      borderWidth: 1
    }
  ]
}
</script>

<template>
  <div class="chart-card">
    <h3>Средний чек по категориям</h3>
    <Bar
      :data="chartData"
      :options="{
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `${value} руб`
            }
          }
        }
      }"
    />
  </div>
</template>
