<template>
  <div>
    <h1>{{ title }}</h1>
    <TodoPage />
  </div>
</template>

<script setup lang="ts">
import TodoPage from './pages/TodoPage.vue'
import { ref } from 'vue'

const title = ref('Todo')
</script>

<style scoped>
/* アプリケーション全体のスタイル */
</style>
