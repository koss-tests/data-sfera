<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import type { IOrder } from '@shared/types'

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

const chartData = {
  labels: topBrandsByRevenueData.value.map((b) => b.brand),
  datasets: [
    {
      label: 'Выручка (руб)',
      data: topBrandsByRevenueData.value.map((b) => b.revenue),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      borderWidth: 1
    }
  ]
}
</script>

<template>
  <div class="chart-container">
    <h3>Топ-5 брендов по выручке</h3>
    <Bar
      :data="chartData"
      :options="{
        indexAxis: 'y',
        responsive: true,
        scales: {
          x: {
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
