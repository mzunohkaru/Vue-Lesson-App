<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <input type="text" v-model="title" placeholder="Enter new task" class="task-input" />
    <button type="submit" class="add-task-button">Add Task</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref('')

const emit = defineEmits<{
  (e: 'add-task', title: string): void
}>()

const handleSubmit = () => {
  const trimmedTitle = title.value.trim()

  if (!trimmedTitle) {
    return
  }

  if (trimmedTitle.length > 100) {
    return
  }

  emit('add-task', trimmedTitle)
  title.value = ''
}
</script>

<style scoped>
.task-form {
  display: flex;
  margin-bottom: 16px;
}

.task-input {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
}

.add-task-button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-task-button:hover {
  background-color: #45a049;
}
</style>
