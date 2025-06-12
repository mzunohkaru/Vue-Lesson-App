<template>
  <div class="todo-page">
    <h1>My Task</h1>
    <TaskForm @add-task="handleAddTask" />
    <TaskList
      :tasks="tasks"
    />
  </div>
</template>

<script setup lang="ts">
import TaskList from '../components/TaskList.vue'
import TaskForm from '../components/TaskForm.vue' // Import TaskForm
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

const handleAddTask = (title: string) => {
  if (title.trim() === '') {
    return // Do not add empty tasks
  }
  const newTask: Task = {
    id: String(Date.now()), // Simple unique ID using timestamp
    title: title,
    completed: false,
  }
  tasks.value.push(newTask)
}

</script>

<style scoped></style>
