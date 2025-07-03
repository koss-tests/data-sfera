<script setup lang="ts">
import { onMounted } from 'vue'
import { Loader } from '@/components'
import { PriceDiscountScatterChart, SalesTrendLineChart } from '@components/charts'
import useSalesStore from '@/store/salesStore'

const salesStore = useSalesStore()

onMounted(async () => {
  await salesStore.getSalesData()
})
</script>

<template>
  <h1>Продажи</h1>
  <div>
    <Loader :is-loading="salesStore.isSalesDataLoading">
      <SalesTrendLineChart :data="salesStore.salesData" />
    </Loader>
    <br />
    <Loader :is-loading="salesStore.isSalesDataLoading">
      <PriceDiscountScatterChart :data="salesStore.salesData" />
    </Loader>
  </div>
  <br />
  <p>
    Пример таблиц в <RouterLink :to="{ name: 'incomes' }">Доходы</RouterLink> и
    <RouterLink :to="{ name: 'orders' }">Заказы</RouterLink>
  </p>
</template>
