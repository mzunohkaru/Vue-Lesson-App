<template>
  <div class="todo-page">
    <h1>{{ todoViewModel.userName.value }} のタスク</h1>
    <TaskForm @add-task="todoViewModel.handleAddTask" />
    <TaskList
      :tasks="todoViewModel.tasks.value"
      @task-status-updated="todoViewModel.handleTaskStatusUpdate"
      @task:deletion:requested="todoViewModel.handleTaskDeletion"
    />
  </div>
</template>

<script setup lang="ts">
import TaskList from './TaskList.vue';
import TaskForm from './TaskForm.vue';
// No longer need to import 'Task' type here directly if not used otherwise
// No longer need 'ref' from vue for tasks state
// No longer need 'useUserStore' directly here if userName is from ViewModel
import { useTodoViewModel } from '@/viewmodels/todoViewModel'; // Adjusted path

const todoViewModel = useTodoViewModel();

// All task logic (tasks ref, handleAddTask, handleTaskStatusUpdate, handleTaskDeletion)
// is now handled by todoViewModel.
</script>

<style scoped></style>
