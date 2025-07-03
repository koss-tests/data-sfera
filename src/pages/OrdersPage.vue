<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Loader } from '@/components'
import { TopBrandsByRevenuePieChart } from '@/components/charts'
import { FilterMatchMode, FilterOperator } from '@primevue/core/api'
import useOrdersStore from '@store/ordersStore'
import { formatDate } from '@shared/utils'

const ordersStore = useOrdersStore()

const filters = ref()

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    g_number: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    warehouse_name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    oblast: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
    },
    discount_percent: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
    },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
    }
  }
}

initFilters()

const clearFilter = () => {
  initFilters()
}

onMounted(async () => {
  await ordersStore.getOrdersData()
})
</script>

<template>
  <h1>Заказы</h1>
  <div>
    <Loader :is-loading="ordersStore.isOrdersDataLoading">
      <TopBrandsByRevenuePieChart :data="ordersStore.ordersData" />
    </Loader>
    <br />
    <DataTable
      v-model:filters="filters"
      :value="ordersStore.ordersData"
      paginator
      showGridlines
      :rows="10"
      dataKey="g_number"
      filterDisplay="menu"
      :loading="ordersStore.isOrdersDataLoading"
      :globalFilterFields="['g_number', 'warehouse_name']"
    >
      <template #header>
        <div style="display: flex; justify-content: space-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            outlined
            @click="clearFilter()"
          />
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </IconField>
        </div>
      </template>
      <Column field="g_number" header="ID" sortable style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.g_number }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" placeholder="Поиск по ID" />
        </template>
      </Column>
      <Column field="warehouse_name" header="Склад" sortable style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.warehouse_name }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" placeholder="Поиск по имени склада" />
        </template>
      </Column>
      <Column header="Область" field="oblast" sortable style="min-width: 10rem">
        <template #body="{ data }">
          {{ data.oblast }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" placeholder="Поиск по области" />
        </template>
      </Column>
      <Column
        header="Скидка"
        field="discount_percent"
        dataType="numeric"
        sortable
        style="min-width: 10rem"
      >
        <template #body="{ data }"> {{ data.discount_percent }}% </template>
        <template #filter="{ filterModel }">
          <InputNumber v-model="filterModel.value" placeholder="Поиск по скидке" />
        </template>
      </Column>
      <Column field="date" header="Date" dataType="date" sortable style="min-width: 10rem">
        <template #body="{ data }">
          {{ formatDate(data.date) }}
        </template>
        <template #filter="{ filterModel }">
          <DatePicker v-model="filterModel.value" dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
