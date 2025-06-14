export interface Task {
  readonly id: string
  title: string
  completed: boolean
}

export interface TaskRepository {
  getTasks(): Promise<Task[]>
  addTask(title: string): Promise<Task>
  updateTask(id: string, updates: Partial<Omit<Task, 'id'>>): Promise<Task>
  deleteTask(id: string): Promise<void>
  findTaskById(id: string): Promise<Task | null>
}

export class TaskEntity implements Task {
  readonly id: string
  title: string
  completed: boolean

  constructor(id: string, title: string, completed: boolean = false) {
    this.id = id
    this.title = title
    this.completed = completed
  }

  static create(title: string): TaskEntity {
    return new TaskEntity(String(Date.now()), title, false)
  }

  toggleCompletion(): TaskEntity {
    return new TaskEntity(this.id, this.title, !this.completed)
  }

  updateTitle(newTitle: string): TaskEntity {
    return new TaskEntity(this.id, newTitle, this.completed)
  }
}
