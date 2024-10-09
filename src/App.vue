<template>
  <RouterView />
</template>

<script setup>
import { useStore } from '@/stores/index'
import { onMounted } from 'vue'

const store = useStore()

// 在組件掛載時初始化狀態
onMounted(() => {
  store.initializeStore()
})
</script>

<style scoped></style>
