import { computed } from 'vue'
import { useTodoStore } from '../viewmodels/useTodoStore'

export function useTaskOperations() {
  const todoStore = useTodoStore()

  const taskItemClasses = (isCompleted: boolean) => computed(() => ({
    'task-item--completed': isCompleted,
  }))

  const taskTitleClasses = (isCompleted: boolean) => computed(() => ({
    'task-title--completed': isCompleted,
  }))

  const handleTaskStatusUpdate = async (taskId: string, newStatus: boolean) => {
    try {
      await todoStore.updateTaskStatus(taskId, newStatus)
    } catch (error) {
      console.error('タスクの状態更新に失敗しました:', error)
    }
  }

  const handleTaskDeletion = async (taskId: string, isCompleted: boolean) => {
    if (!isCompleted) {
      console.warn('未完了のタスクは削除できません')
      return
    }

    try {
      await todoStore.deleteTask(taskId)
    } catch (error) {
      console.error('タスクの削除に失敗しました:', error)
    }
  }

  const handleAddTask = async (title: string) => {
    try {
      await todoStore.addTask(title)
    } catch (error) {
      console.error('タスクの追加に失敗しました:', error)
      throw error
    }
  }

  return {
    taskItemClasses,
    taskTitleClasses,
    handleTaskStatusUpdate,
    handleTaskDeletion,
    handleAddTask,
  }
}
