<script setup lang="ts">
import { onMounted } from 'vue'
import { Loader } from '@/components'
import { WarehousesStockBarChart } from '@/components/charts'
import useStocksStore from '@store/stocksStore'

const stocksStore = useStocksStore()

onMounted(async () => {
  await stocksStore.getStocksData()
})
</script>

<template>
  <h1>Склады</h1>
  <div>
    <Loader :is-loading="stocksStore.isStocksDataLoading">
      <WarehousesStockBarChart :data="stocksStore.stocksData" />
    </Loader>
    <br />
    <p>
      Пример таблиц в <RouterLink :to="{ name: 'incomes' }">Доходы</RouterLink> и
      <RouterLink :to="{ name: 'orders' }">Заказы</RouterLink>
    </p>
  </div>
</template>
