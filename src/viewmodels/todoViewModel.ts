import { computed, ref } from 'vue'; // ref might be needed for error messages or local VM state
import { useUserStore } from '@/store/useUserStore';
import { useTaskModel } from '@/models/taskModel'; // Corrected path
// Task type might not be needed here if taskModel handles it all

export function useTodoViewModel() {
  const userStore = useUserStore();
  const taskModel = useTaskModel();

  // The ViewModel now gets tasks directly from the model's reactive 'tasks' ref
  const tasks = taskModel.tasks;

  const userName = computed(() => userStore.userProfile?.name || 'ユーザー');
  const taskError = ref<string | null>(null); // Example: for error messages from model

  async function handleAddTask(title: string): Promise<void> {
    taskError.value = null; // Clear previous error
    const result = taskModel.addTask(title);
    if (!result.success) {
      taskError.value = result.message || 'Failed to add task.';
      // console.warn(result.message); // Or handle error appropriately
    }
    // Task list in UI will update automatically due to reactivity from model.tasks
  }

  function handleTaskStatusUpdate(taskId: string, newStatus: boolean): void {
    taskModel.updateTaskStatus(taskId, newStatus);
    // UI updates automatically
  }

  function handleTaskDeletion(taskId: string): void {
    taskModel.deleteTask(taskId);
    // UI updates automatically
  }

  return {
    userName,
    tasks, // This is now taskModel.tasks (a readonly ref)
    handleAddTask,
    handleTaskStatusUpdate,
    handleTaskDeletion,
    taskError, // Expose error state to the View if needed
  };
}
