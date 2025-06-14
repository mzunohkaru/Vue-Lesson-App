import type { Task, TaskRepository } from './TaskModel'
import { TaskEntity } from './TaskModel'

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [
    { id: '1', title: 'タスク1', completed: false },
    { id: '2', title: 'タスク2', completed: true },
    { id: '3', title: 'タスク3', completed: false },
  ]

  async getTasks(): Promise<Task[]> {
    return [...this.tasks]
  }

  async addTask(title: string): Promise<Task> {
    const existingTask = this.tasks.find(
      task => task.title.toLowerCase() === title.toLowerCase()
    )
    
    if (existingTask) {
      throw new Error('重複するタスクは追加できません')
    }

    const newTask = TaskEntity.create(title)
    this.tasks.push(newTask)
    return newTask
  }

  async updateTask(id: string, updates: Partial<Omit<Task, 'id'>>): Promise<Task> {
    const taskIndex = this.tasks.findIndex(task => task.id === id)
    
    if (taskIndex === -1) {
      throw new Error('タスクが見つかりません')
    }

    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates }
    return this.tasks[taskIndex]
  }

  async deleteTask(id: string): Promise<void> {
    const task = this.tasks.find(t => t.id === id)
    
    if (!task) {
      throw new Error('タスクが見つかりません')
    }

    if (!task.completed) {
      throw new Error('完了済みタスクのみ削除可能です')
    }

    this.tasks = this.tasks.filter(task => task.id !== id)
  }

  async findTaskById(id: string): Promise<Task | null> {
    return this.tasks.find(task => task.id === id) || null
  }
}
