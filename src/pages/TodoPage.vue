<template>
  <div class="todo-page">
    <h1>{{ userStore.userProfile?.name }} のタスク</h1>
    <TaskForm @add-task="handleAddTask" />
    <TaskList
      :tasks="tasks"
      @task-status-updated="handleTaskStatusUpdate"
      @task:deletion:requested="handleTaskDeletion"
    />
  </div>
</template>

<script setup lang="ts">
import TaskList from '../components/TaskList.vue'
import TaskForm from '../components/TaskForm.vue'
import type { Task } from '../types/task'
import { ref } from 'vue'
import { useUserStore } from '@/store/useUserStore'

const userStore = useUserStore()

const tasks = ref<Task[]>([
  { id: '1', title: 'タスク1', completed: false },
  { id: '2', title: 'タスク2', completed: true },
  { id: '3', title: 'タスク3', completed: false },
])

/**
 * タスクの完了状態を更新
 */
function handleTaskStatusUpdate(taskId: string, newStatus: boolean): void {
  const task = tasks.value.find((task) => task.id === taskId)
  if (task) {
    task.completed = newStatus
  }
}

/**
 * タスクを削除
 */
function handleTaskDeletion(taskId: string): void {
  tasks.value = tasks.value.filter((task) => task.id !== taskId)
}

/**
 * タスクを追加
 */
function handleAddTask(title: string): void {
  // ビジネスロジック層のバリデーション
  const isDuplicate = tasks.value.some((task) => task.title.toLowerCase() === title.toLowerCase())

  if (isDuplicate) {
    // 重複エラー処理
    return
  }

  tasks.value.push({
    id: String(Date.now()),
    title,
    completed: false,
  })
}
</script>

<style scoped></style>
