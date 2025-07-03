<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Loader from '@components/Loader.vue'
import { GoodsReceiptBarСhart, TopProductsByQuantityOfDeliveriesBarChart } from '@components/charts'
import { FilterMatchMode, FilterOperator } from '@primevue/core/api'
import useIncomesStore from '@store/incomesStore'
import { formatDate } from '@shared/utils'

const incomesStore = useIncomesStore()

const filters = ref()

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nm_id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    warehouse_name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    quantity: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
    },
    total_price: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
    },
    date_close: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
    }
    // 'country.name': {
    //   operator: FilterOperator.AND,
    //   constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    // },
    // representative: { value: null, matchMode: FilterMatchMode.IN },
    // date: {
    //   operator: FilterOperator.AND,
    //   constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    // },
    // balance: {
    //   operator: FilterOperator.AND,
    //   constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    // },
    // status: {
    //   operator: FilterOperator.OR,
    //   constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    // },
    // activity: { value: [0, 100], matchMode: FilterMatchMode.BETWEEN },
    // verified: { value: null, matchMode: FilterMatchMode.EQUALS },
  }
}

initFilters()

// const formatCurrency = (value: any) => {
//   return value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })
// }

const clearFilter = () => {
  initFilters()
}

onMounted(async () => {
  await incomesStore.getIncomesData()
})
</script>

<template>
  <h1>Доходы</h1>
  <div>
    <Loader :is-loading="incomesStore.isIncomesDataLoading">
      <template #loading>Загрузка графика "Топ-5 товаров по количеству поставок"</template>
      <TopProductsByQuantityOfDeliveriesBarChart :data="incomesStore.incomesData" />
    </Loader>
    <br />
    <Loader :is-loading="incomesStore.isIncomesDataLoading">
      <template #loading>Загрузка графика "Динамика поступлений по датам"</template>
      <GoodsReceiptBarСhart :data="incomesStore.incomesData" />
    </Loader>
    <br />
    <DataTable
      v-model:filters="filters"
      :value="incomesStore.incomesData"
      paginator
      showGridlines
      :rows="10"
      dataKey="id"
      filterDisplay="menu"
      :loading="incomesStore.isIncomesDataLoading"
      :globalFilterFields="['nm_id', 'warehouse_name']"
    >
      <template #header>
        <div class="flex justify-between" style="display: flex; justify-content: space-between">
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
      <template #empty>{{
        incomesStore.isIncomesDataLoading
          ? 'Loading incomes data. Please wait.'
          : 'No incomes found.'
      }}</template>
      <Column field="nm_id" header="ID" sortable style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.nm_id }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" placeholder="Search by ID" />
        </template>
      </Column>
      <Column field="warehouse_name" header="Warehouse Name" sortable style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.warehouse_name }}
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
        </template>
      </Column>
      <Column header="Quantity" field="quantity" sortable style="min-width: 10rem">
        <template #body="{ data }">
          {{ data.quantity }}
        </template>
        <template #filter="{ filterModel }">
          <InputNumber v-model="filterModel.value" placeholder="Search by quantity" />
        </template>
      </Column>
      <Column header="Total price" field="total_price" sortable style="min-width: 10rem">
        <template #body="{ data }">
          {{ data.total_price }}
        </template>
        <template #filter="{ filterModel }">
          <InputNumber v-model="filterModel.value" placeholder="Search by total price" />
        </template>
      </Column>
      <Column
        field="date_close"
        header="Date Close"
        dataType="date"
        sortable
        style="min-width: 10rem"
      >
        <template #body="{ data }">
          {{ formatDate(data.date_close) }}
        </template>
        <template #filter="{ filterModel }">
          <DatePicker v-model="filterModel.value" dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
