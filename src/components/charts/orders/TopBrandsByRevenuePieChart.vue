<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js'
import type { IOrder } from '@shared/types'

ChartJS.register(Tooltip, Legend, ArcElement)

const { data } = defineProps<{
  data: IOrder[]
}>()

// Топ-5 брендов по выручке
const topBrandsByRevenueData = computed(() => {
  const brandRevenue: Record<string, number> = {}

  data.forEach((order: IOrder) => {
    if (!order.is_cancel) {
      const revenue = parseFloat(order.total_price)
      brandRevenue[order.brand] = (brandRevenue[order.brand] || 0) + revenue
    }
  })

  return Object.entries(brandRevenue)
    .map(([brand, revenue]) => ({ brand, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
})

const chartData = computed(() => ({
  labels: topBrandsByRevenueData.value.map((item) => item.brand),
  datasets: [
    {
      data: topBrandsByRevenueData.value.map((item) => item.revenue),
      backgroundColor: [
        '#FF6384', // Розовый
        '#36A2EB', // Голубой
        '#FFCE56', // Желтый
        '#4BC0C0', // Бирюзовый
        '#9966FF' // Фиолетовый
      ],
      borderWidth: 1
    }
  ]
}))

const chartOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const label = context.label || ''
          const value = context.raw || 0
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = Math.round((value / total) * 100)
          return `${label}: ${value.toLocaleString()} руб (${percentage}%)`
        }
      }
    },
    legend: {
      position: 'bottom' as const,
      labels: {
        boxWidth: 12,
        padding: 20
      },
      padding: {
        bottom: 32
      }
    }
  }
}
</script>

<template>
  <div class="pie-chart-container">
    <h3>Топ-5 брендов по выручке</h3>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>
