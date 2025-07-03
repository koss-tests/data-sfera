<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { getCssVariable } from '@/shared/utils'
import type { IStock } from '@shared/types'

ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { data } = defineProps<{
  data: IStock[]
}>()

// Топ складов по остаткам (для Stacked Bar Chart)
const warehousesStockData = computed(() => {
  const warehouses = new Map<string, { available: number; inTransit: number }>()

  data.forEach((item) => {
    const current = warehouses.get(item.warehouse_name) || { available: 0, inTransit: 0 }
    warehouses.set(item.warehouse_name, {
      available: current.available + item.quantity_full,
      inTransit: current.inTransit + item.in_way_from_client
    })
  })

  return Array.from(warehouses.entries()).map(([name, stats]) => ({
    name,
    ...stats
  }))
})

const chartData = computed(() => ({
  labels: warehousesStockData.value.map((w) => w.name),
  datasets: [
    {
      label: 'Доступно',
      data: warehousesStockData.value.map((w) => w.available),
      backgroundColor: getCssVariable('--p-primary-400') ?? '#3b82f6' // Синий
    },
    {
      label: 'В пути',
      data: warehousesStockData.value.map((w) => w.inTransit),
      backgroundColor: '#f59e0b' // Жёлтый
    }
  ]
}))

const chartOptions = {
  responsive: true,
  scales: { x: { stacked: true }, y: { stacked: true } }
}
</script>

<template>
  <div class="chart-container">
    <h3>Остатки по складам</h3>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
