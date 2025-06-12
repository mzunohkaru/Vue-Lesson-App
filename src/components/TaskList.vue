<template>
  <ul class="task-list">
    <li v-for="task in tasks" :key="task.id" class="task-list-item">
      <TaskItem
        :task-id="task.id"
        :title="task.title"
        :is-completed="task.completed"
        @task-status-updated="handleTaskStatusUpdate"
        @task-deletion-requested="handleTaskDeletion"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import TaskItem from './TaskItem.vue'
import type { Task } from '../types/task'

// プロップの定義
interface Props {
  tasks: Task[]
}

// イベントの定義
interface Emits {
  (e: 'task-status-updated', taskId: string, newStatus: boolean): void
  (e: 'task-deletion-requested', taskId: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

/**
 * タスクの完了状態更新イベントを親コンポーネントに委譲
 */
function handleTaskStatusUpdate(taskId: string, newCompletionStatus: boolean): void {
  emit('task-status-updated', taskId, newCompletionStatus)
}

/**
 * タスクの削除要求イベントを親コンポーネントに委譲
 */
function handleTaskDeletion(taskId: string): void {
  emit('task-deletion-requested', taskId)
}
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
