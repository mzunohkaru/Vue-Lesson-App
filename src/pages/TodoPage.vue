<template>
  <div class="todo-page">
    <h1>My Task</h1>
    <TaskList
      :tasks="tasks"
      @task-status-updated="handleTaskStatusUpdate"
      @task-deletion-requested="handleTaskDeletion"
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

/**
 * タスクの完了状態を更新
 */
function handleTaskStatusUpdate(taskId: string, newStatus: boolean): void {
  const taskIndex = tasks.value.findIndex((task) => task.id === taskId)
  if (taskIndex !== -1) {
    tasks.value[taskIndex].completed = newStatus
  }
}

/**
 * タスクを削除
 */
function handleTaskDeletion(taskId: string): void {
  tasks.value = tasks.value.filter((task) => task.id !== taskId)
}
</script>

<style scoped></style>
