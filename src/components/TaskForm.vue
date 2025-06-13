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
import { computed } from 'vue'
import { useField } from 'vee-validate'
import * as yup from 'yup'

const titleSchema = yup
  .string()
  .required('タスクを入力してください')
  .max(15, 'タスクは15文字以内で入力してください')
  .matches(/^[a-zA-Z0-9 ]+$/, '英数字とスペースのみ利用できます')
  .test('no-trim', '先頭・末尾にスペースを入れないでください', (value) => {
    if (!value) return true
    return value.trim() === value
  })
const { value: title, errorMessage } = useField<string>('title', titleSchema)

const emit = defineEmits<{
  (e: 'add-task', title: string): void
}>()

const hasError = computed(() => Boolean(errorMessage.value))

const handleSubmit = () => {
  if (hasError.value) return
  emit('add-task', title.value)
  title.value = ''
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
