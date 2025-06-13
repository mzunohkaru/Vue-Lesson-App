<template>
  <h1>タスク詳細</h1>
  <p>タスクID: {{ taskId }}</p>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const taskId = route.params.id
</script>