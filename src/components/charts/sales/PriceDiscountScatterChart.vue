<script setup lang="ts">
import { computed } from 'vue'
import { Scatter } from 'vue-chartjs'
import { Chart as ChartJS, Tooltip, Legend, LineElement, PointElement, LinearScale } from 'chart.js'
import type { ISale } from '@shared/types'

ChartJS.register(Tooltip, Legend, PointElement, LineElement, LinearScale)

const { data } = defineProps<{
  data: ISale[]
}>()

// Данные для Scatter Chart (цена vs скидка)
const priceDiscountData = computed(() => {
  return data.map((sale) => ({
    x: parseFloat(sale.total_price),
    y: parseFloat(sale.discount_percent || '0'),
    brand: sale.brand,
    region: sale.region_name
  }))
})

const chartData = {
  datasets: [
    {
      label: 'Продажи',
      data: priceDiscountData.value,
      backgroundColor: (ctx: any) => {
        const discount = ctx.raw?.y
        return discount > 30 ? '#ef4444' : discount > 15 ? '#f59e0b' : '#10b981'
      },
      pointRadius: (ctx: any) => {
        const price = ctx.raw?.x
        return price > 2000 ? 8 : 5
      },
      pointStyle: (ctx: any) => {
        return ctx.raw?.region.includes('Москва') ? 'circle' : 'rect'
      }
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: (ctx: any) => {
          return [
            `Бренд: ${ctx.raw?.brand}`,
            `Регион: ${ctx.raw?.region}`,
            `Цена: ${ctx.raw?.x} руб`,
            `Скидка: ${ctx.raw?.y}%`
          ]
        }
      }
    }
  },
  scales: {
    x: {
      title: { display: true, text: 'Сумма чека (руб)' }
    },
    y: {
      title: { display: true, text: 'Размер скидки (%)' }
    }
  }
}
</script>

<template>
  <div class="chart-container">
    <h3>Зависимость скидки от суммы чека</h3>
    <Scatter :data="chartData" :options="chartOptions" />
  </div>
</template>
