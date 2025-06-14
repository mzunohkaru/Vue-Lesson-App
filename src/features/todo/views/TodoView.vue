<template>
  <div class="todo-page">
    <h1>{{ userStore.userProfile?.name }} のタスク</h1>
    <div v-if="todoStore.error" class="error-message">
      {{ todoStore.error }}
      <button @click="todoStore.clearError">×</button>
    </div>
    <TaskForm />
    <TaskList />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import TaskList from './components/TaskList.vue'
import TaskForm from './components/TaskForm.vue'
import { useTodoStore } from '../viewmodels/useTodoStore'
import { useUserStore } from '../../../shared/stores/useUserStore'

const todoStore = useTodoStore()
const userStore = useUserStore()

onMounted(async () => {
  await todoStore.loadTasks()
})
</script>

<style scoped>
.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error-message button {
  background: none;
  border: none;
  color: #721c24;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
}
</style>
