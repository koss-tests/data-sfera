<script setup lang="ts">
const { isLoading } = defineProps<{
  isLoading: boolean
}>()
</script>

<template>
  <div>
    <slot v-if="isLoading" name="loading">Загрузка...</slot>
    <slot v-else></slot>
  </div>
</template>

<style scoped lang="scss"></style>
