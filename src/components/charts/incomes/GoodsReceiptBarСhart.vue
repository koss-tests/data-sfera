<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { getCssVariable } from '@/shared/utils'
import type { IIncome } from '@shared/types'

ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { data } = defineProps<{
  data: IIncome[]
}>()

// Группировка данных по дате и суммирование quantity
const groupedByDate = computed(() => {
  const groups: Record<string, number> = {}
  data.forEach((item: any) => {
    const date = item.date
    groups[date] = (groups[date] || 0) + item.quantity
  })
  return Object.entries(groups).map(([date, quantity]) => ({
    date,
    quantity
  }))
})

const groupedByDateСhartData = computed(() => ({
  labels: groupedByDate.value.map((item: any) => item.date),
  datasets: [
    {
      label: 'Количество товаров',
      backgroundColor: getCssVariable('--p-primary-400') ?? 'green',
      data: groupedByDate.value.map((item: any) => item.quantity)
    }
  ]
}))
</script>

<template>
  <div class="chart-container">
    <h3>Динамика поступлений по датам</h3>
    <Bar
      :data="groupedByDateСhartData"
      :options="{
        responsive: true
      }"
    />
  </div>
</template>
