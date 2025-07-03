<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Tooltip, Legend, ArcElement, type CoreChartOptions } from 'chart.js'
import type { IStock } from '@shared/types'

ChartJS.register(Tooltip, Legend, ArcElement)

const { data } = defineProps<{
  data: IStock[]
}>()
// Распределение по категориям (для Doughnut Chart)
const categoryDistributionData = computed(() => {
  const categories = new Map<string, number>()

  data.forEach((item) => {
    categories.set(item.category, (categories.get(item.category) || 0) + item.quantity_full)
  })

  return Array.from(categories.entries()).sort((a, b) => b[1] - a[1]) // Сортировка по убыванию
})

const chartData = computed(() => ({
  labels: categoryDistributionData.value.map(([name]) => name),
  datasets: [
    {
      data: categoryDistributionData.value.map(([_, count]) => count),
      backgroundColor: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
      borderWidth: 1
    }
  ]
}))

const chartOptions: Partial<CoreChartOptions<'doughnut'>> = {
  responsive: true
}
</script>

<template>
  <div class="pie-chart-container">
    <h3>Распределение по категориям</h3>
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>
