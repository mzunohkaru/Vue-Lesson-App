<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <div class="input-container">
      <input
        type="text"
        v-model="title"
        placeholder="Enter new task"
        class="task-input"
        :class="{ error: hasError }"
      />
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
    <button type="submit" class="add-task-button" :disabled="hasError">Add Task</button>
  </form>
</template>

<script setup lang="ts">
import { useTaskValidation } from '@/features/todo/composables/useTaskValidation'

const { title, errorMessage, hasError, resetField } = useTaskValidation()

const emit = defineEmits<{
  (e: 'add-task', title: string): void
}>()

const handleSubmit = () => {
  if (hasError.value) return
  emit('add-task', title.value)
  resetField()
}
</script>

<style scoped>
.task-form {
  display: flex;
  margin-bottom: 16px;
  gap: 8px;
}

.input-container {
  flex-grow: 1;
}

.task-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.task-input.error {
  border-color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
}

.add-task-button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-task-button:hover:not(:disabled) {
  background-color: #45a049;
}

.add-task-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
