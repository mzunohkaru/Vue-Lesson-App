<template>
  <div class="todo-page">
    <h1>My Task</h1>
    <TaskList
      :tasks="tasks"
    />
  </div>
</template>

<script setup lang="ts">
import TaskList from '../components/TaskList.vue'
import { ref } from 'vue'

// ビジネスエンティティの型定義
type Task = {
  readonly id: string
  title: string
  completed: boolean
}

const tasks = ref<Task[]>([
  { id: '1', title: 'タスク1', completed: false },
  { id: '2', title: 'タスク2', completed: true },
  { id: '3', title: 'タスク3', completed: false },
])

</script>

<style scoped></style>
