import { ref, readonly } from 'vue';
import type { Task } from '@/types/task';

// In a real application, this would interact with a backend or localStorage.
// For now, it's an in-memory store.
const tasksState = ref<Task[]>([
  { id: 'model-1', title: 'タスク1 from Model', completed: false },
  { id: 'model-2', title: 'タスク2 from Model', completed: true },
  { id: 'model-3', title: 'タスク3 from Model', completed: false },
]);

export function useTaskModel() {
  const tasks = readonly(tasksState); // Expose as readonly to encourage mutations via methods

  function getTasks(): Readonly<Task[]> {
    return tasks.value;
  }

  function addTask(title: string): { success: boolean; message?: string; task?: Task } {
    const isDuplicate = tasksState.value.some(
      (task) => task.title.toLowerCase() === title.toLowerCase()
    );
    if (isDuplicate) {
      return { success: false, message: 'Duplicate task title.' };
    }
    if (title.trim() === '') {
      return { success: false, message: 'Task title cannot be empty.' };
    }

    const newTask: Task = {
      id: String(Date.now()),
      title: title.trim(),
      completed: false,
    };
    tasksState.value.push(newTask);
    return { success: true, task: newTask };
  }

  function updateTaskStatus(taskId: string, completed: boolean): boolean {
    const taskIndex = tasksState.value.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      tasksState.value[taskIndex].completed = completed;
      return true;
    }
    return false;
  }

  function deleteTask(taskId: string): boolean {
    const initialLength = tasksState.value.length;
    tasksState.value = tasksState.value.filter((task) => task.id !== taskId);
    return tasksState.value.length < initialLength;
  }

  return {
    tasks, // Readonly ref for reactive consumption by ViewModel
    getTasks,
    addTask,
    updateTaskStatus,
    deleteTask,
  };
}
