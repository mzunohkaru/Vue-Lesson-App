import { defineStore } from 'pinia'
import type { Task, TaskRepository } from '../models/TaskModel'
import { InMemoryTaskRepository } from '../models/TaskRepository'

interface TodoState {
  tasks: Task[]
  loading: boolean
  error: string | null
}

export const useTodoStore = defineStore('todo', {
  state: (): TodoState => ({
    tasks: [],
    loading: false,
    error: null,
  }),

  getters: {
    completedTasks: (state) => state.tasks.filter(task => task.completed),
    pendingTasks: (state) => state.tasks.filter(task => !task.completed),
    taskCount: (state) => state.tasks.length,
    completedCount: (state) => state.tasks.filter(task => task.completed).length,
  },

  actions: {
    async loadTasks() {
      const repository = new InMemoryTaskRepository() as TaskRepository
      this.loading = true
      this.error = null
      
      try {
        this.tasks = await repository.getTasks()
      } catch (error) {
        this.error = error instanceof Error ? error.message : '不明なエラーが発生しました'
      } finally {
        this.loading = false
      }
    },

    async addTask(title: string) {
      const repository = new InMemoryTaskRepository() as TaskRepository
      this.loading = true
      this.error = null

      try {
        const newTask = await repository.addTask(title)
        this.tasks.push(newTask)
      } catch (error) {
        this.error = error instanceof Error ? error.message : '不明なエラーが発生しました'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateTaskStatus(taskId: string, completed: boolean) {
      const repository = new InMemoryTaskRepository() as TaskRepository
      this.loading = true
      this.error = null

      try {
        await repository.updateTask(taskId, { completed })
        const taskIndex = this.tasks.findIndex(task => task.id === taskId)
        if (taskIndex !== -1) {
          this.tasks[taskIndex].completed = completed
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : '不明なエラーが発生しました'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteTask(taskId: string) {
      const repository = new InMemoryTaskRepository() as TaskRepository
      this.loading = true
      this.error = null

      try {
        await repository.deleteTask(taskId)
        this.tasks = this.tasks.filter(task => task.id !== taskId)
      } catch (error) {
        this.error = error instanceof Error ? error.message : '不明なエラーが発生しました'
        throw error
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    },
  },
})
