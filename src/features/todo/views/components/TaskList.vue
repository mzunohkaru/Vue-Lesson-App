<template>
  <ul class="task-list">
    <li v-for="task in todoStore.tasks" :key="task.id" class="task-list-item">
      <TaskItem
        :task-id="task.id"
        :title="task.title"
        :is-completed="task.completed"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import TaskItem from './TaskItem.vue'
import { useTodoStore } from '../../viewmodels/useTodoStore'

const todoStore = useTodoStore()
</script>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list-item {
  margin-bottom: 8px;
}
</style>
