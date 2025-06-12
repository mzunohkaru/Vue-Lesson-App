<template>
  <div class="task-item" :class="taskItemClasses">
    <div class="task-content">
      <label class="checkbox-wrapper" :for="`task-checkbox-${taskId}`">
        <input
          :id="`task-checkbox-${taskId}`"
          type="checkbox"
          :checked="isCompleted"
          @change="handleCompletionToggle"
          class="task-checkbox"
          :aria-label="`タスク「${title}」の完了状態を切り替え`"
        />
        <span class="checkmark" aria-hidden="true"></span>
      </label>
      <span class="task-title" :class="taskTitleClasses">
        {{ title }}
      </span>
    </div>
    <button
      @click="handleDeletionRequest"
      class="delete-btn"
      :aria-label="`タスク「${title}」を削除`"
      :disabled="!isCompleted"
      :title="isCompleted ? 'タスクを削除' : '完了済みタスクのみ削除可能'"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <polyline points="3,6 5,6 21,6"></polyline>
        <path
          d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1 2,2h4a2,2 0 0,1 2,2v2"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// プロパティの型定義（より明確な命名）
type TaskItemProps = {
  taskId: string
  title: string
  isCompleted: boolean
}

// イベントの型定義（より明確な命名）
type TaskItemEmits = {
  'task-status-updated': [taskId: string, newStatus: boolean]
  'task-deletion-requested': [taskId: string]
}

const props = defineProps<TaskItemProps>()
const emit = defineEmits<TaskItemEmits>()

/**
 * タスクアイテムのCSSクラスを計算
 */
const taskItemClasses = computed(() => ({
  'task-item--completed': props.isCompleted,
}))

/**
 * タスクタイトルのCSSクラスを計算
 */
const taskTitleClasses = computed(() => ({
  'task-title--completed': props.isCompleted,
}))

/**
 * タスクの削除要求をハンドル
 * ビジネスルール：完了済みタスクのみ削除可能
 */
function handleDeletionRequest(): void {
  if (!props.isCompleted) {
    console.warn('未完了のタスクは削除できません')
    return
  }

  emit('task-deletion-requested', props.taskId)
}

/**
 * タスクの完了状態切り替えをハンドル
 * @param event - チェックボックスの変更イベント
 */
function handleCompletionToggle(event: Event): void {
  const target = event.target as HTMLInputElement
  const newCompletionStatus = target.checked

  emit('task-status-updated', props.taskId, newCompletionStatus)
}
</script>

<style scoped>
.task-item {
  background: #ffffff;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  padding: 16px 20px;
  margin: 8px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.task-item:hover {
  border-color: #007bff;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.15);
}

.task-item--completed {
  background: #f8f9fa;
  border-color: #28a745;
}

.task-content {
  display: flex;
  align-items: center;
  flex: 1;
}

/* カスタムチェックボックス */
.checkbox-wrapper {
  position: relative;
  cursor: pointer;
  margin-right: 12px;
}

.task-checkbox {
  opacity: 0;
  position: absolute;
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.checkmark {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 2px solid #dee2e6;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.checkmark::after {
  content: '';
  position: absolute;
  display: none;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.task-checkbox:checked ~ .checkmark {
  background: #28a745;
  border-color: #28a745;
}

.task-checkbox:checked ~ .checkmark::after {
  display: block;
}

.task-checkbox:focus ~ .checkmark {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

.task-title {
  font-size: 16px;
  color: #343a40;
  font-weight: 500;
  transition: all 0.2s ease;
  user-select: none;
}

.task-title--completed {
  color: #6c757d;
  text-decoration: line-through;
}

/* 削除ボタン */
.delete-btn {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:not(:disabled):hover {
  background: #f8d7da;
  color: #721c24;
}

.delete-btn:focus {
  outline: 2px solid #dc3545;
  outline-offset: 2px;
}

.delete-btn:disabled {
  color: #6c757d;
  cursor: not-allowed;
  opacity: 0.5;
}

/* レスポンシブ対応 */
@media (max-width: 480px) {
  .task-item {
    padding: 12px 16px;
  }

  .task-title {
    font-size: 14px;
  }
}
</style>
