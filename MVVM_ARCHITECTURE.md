# MVVM Architecture Documentation

## Overview

This Vue.js application has been restructured to follow the MVVM (Model-View-ViewModel) architectural pattern, providing clear separation of concerns and improved maintainability.

## Architecture Principles

### MVVM Pattern
- **Model**: Data entities and business logic for data access
- **View**: Pure presentation components with minimal logic
- **ViewModel**: State management and data transformation using Pinia stores

### Key Benefits
- Clear separation of concerns
- Improved testability
- Better code organization
- Enhanced maintainability
- Scalable architecture

## Directory Structure

```
src/
├── features/                    # Feature-first organization
│   └── todo/                   # Todo feature module
│       ├── models/             # Model layer - Data entities and repositories
│       │   ├── TaskModel.ts    # Task entity and repository interface
│       │   └── TaskRepository.ts # Task data access implementation
│       ├── viewmodels/         # ViewModel layer - State management
│       │   └── useTodoStore.ts # Pinia store for todo state
│       ├── composables/        # Reusable business logic
│       │   ├── useTaskValidation.ts # Form validation logic
│       │   └── useTaskOperations.ts # Task operation helpers
│       └── views/              # View layer - Presentation components
│           ├── TodoView.vue    # Main todo page component
│           └── components/     # Feature-specific components
│               ├── TaskForm.vue
│               ├── TaskList.vue
│               └── TaskItem.vue
├── shared/                     # Shared utilities and components
│   ├── stores/                 # Global stores
│   │   └── useUserStore.ts     # User authentication store
│   └── types/                  # Shared type definitions
│       ├── user.ts
│       └── task.ts
├── pages/                      # Route-level pages (legacy)
├── components/                 # Global components (legacy)
├── types/                      # Global types (legacy)
└── router/                     # Application routing
```

## Layer Responsibilities

### Model Layer (`src/features/todo/models/`)

**Purpose**: Defines data structures and handles data access operations.

**Components**:
- `TaskModel.ts`: Defines the Task entity and TaskRepository interface
- `TaskRepository.ts`: Implements data access operations (CRUD)

**Responsibilities**:
- Data entity definitions
- Business rules enforcement
- Data validation at the model level
- Repository pattern implementation
- Data persistence abstraction

**Example**:
```typescript
// TaskModel.ts
export interface Task {
  readonly id: string
  title: string
  completed: boolean
}

export class TaskEntity implements Task {
  // Entity methods for business logic
  toggleCompletion(): TaskEntity { ... }
  updateTitle(newTitle: string): TaskEntity { ... }
}
```

### ViewModel Layer (`src/features/todo/viewmodels/`)

**Purpose**: Manages application state and coordinates between Model and View layers.

**Components**:
- `useTodoStore.ts`: Pinia store managing todo application state

**Responsibilities**:
- State management using Pinia
- Coordinating Model operations
- Exposing computed properties for Views
- Error handling and loading states
- Business logic orchestration

**Example**:
```typescript
// useTodoStore.ts
export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
  }),
  
  getters: {
    completedTasks: (state) => state.tasks.filter(task => task.completed),
    pendingTasks: (state) => state.tasks.filter(task => !task.completed),
  },
  
  actions: {
    async addTask(title: string) { ... },
    async updateTaskStatus(taskId: string, completed: boolean) { ... },
  }
})
```

### View Layer (`src/features/todo/views/`)

**Purpose**: Pure presentation components focused on user interface.

**Components**:
- `TodoView.vue`: Main container component
- `components/TaskForm.vue`: Task input form
- `components/TaskList.vue`: Task collection display
- `components/TaskItem.vue`: Individual task component

**Responsibilities**:
- User interface rendering
- User interaction handling
- Consuming ViewModel state
- Minimal presentation logic only
- Event emission to ViewModels

**Example**:
```vue
<!-- TaskForm.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="title" :class="{ error: hasError }" />
    <button :disabled="hasError || todoStore.loading">Add Task</button>
  </form>
</template>

<script setup lang="ts">
import { useTaskValidation } from '../../composables/useTaskValidation'
import { useTodoStore } from '../../viewmodels/useTodoStore'

const { title, hasError } = useTaskValidation()
const todoStore = useTodoStore()
</script>
```

### Composables (`src/features/todo/composables/`)

**Purpose**: Reusable business logic and utilities.

**Components**:
- `useTaskValidation.ts`: Form validation logic
- `useTaskOperations.ts`: Task operation helpers

**Responsibilities**:
- Reusable business logic
- Form validation
- Computed properties
- Event handlers
- Utility functions

## Data Flow

### Unidirectional Data Flow
1. **View** triggers user actions (form submission, button clicks)
2. **ViewModel** (Pinia store) receives actions and coordinates business logic
3. **Model** performs data operations and enforces business rules
4. **ViewModel** updates reactive state based on Model results
5. **View** automatically re-renders based on ViewModel state changes

### Example Flow: Adding a Task
```
1. User types in TaskForm (View)
2. Form validation via useTaskValidation composable
3. Form submission calls todoStore.addTask() (ViewModel)
4. Store calls repository.addTask() (Model)
5. Model validates and creates task entity
6. Repository updates data and returns result
7. Store updates reactive state
8. TaskList component re-renders automatically (View)
```

## Migration Guide

### From Old Architecture
The previous architecture had all business logic embedded in `TodoPage.vue`:

**Before**:
```vue
<!-- TodoPage.vue -->
<script setup lang="ts">
const tasks = ref<Task[]>([...])

function handleAddTask(title: string): void {
  // Business logic mixed with component
  const isDuplicate = tasks.value.some(...)
  if (isDuplicate) return
  tasks.value.push({ id: String(Date.now()), title, completed: false })
}
</script>
```

**After**:
```vue
<!-- TodoView.vue -->
<script setup lang="ts">
import { useTodoStore } from '../viewmodels/useTodoStore'

const todoStore = useTodoStore()
// Business logic now in ViewModel (Pinia store)
// Component focuses only on presentation
</script>
```

### Key Changes
1. **State Management**: Moved from local component state to Pinia stores
2. **Business Logic**: Extracted to composables and repository classes
3. **Validation**: Separated into dedicated composables
4. **Data Access**: Abstracted behind repository interfaces
5. **Component Responsibility**: Reduced to pure presentation logic

## Best Practices

### Model Layer
- Keep entities immutable where possible
- Implement business rules in entity methods
- Use repository pattern for data access
- Abstract external dependencies

### ViewModel Layer
- Use Pinia stores for state management
- Implement proper error handling
- Provide loading states for async operations
- Keep computed properties pure

### View Layer
- Focus on presentation only
- Use composables for reusable logic
- Emit events rather than calling methods directly
- Keep templates declarative

### Composables
- Make them focused and reusable
- Return reactive references
- Handle cleanup properly
- Document expected usage

## Testing Strategy

### Model Testing
- Unit test entity business logic
- Mock repository implementations
- Test data validation rules
- Verify error handling

### ViewModel Testing
- Test Pinia store actions and getters
- Mock repository dependencies
- Verify state transitions
- Test error scenarios

### View Testing
- Test component rendering
- Verify user interactions
- Mock ViewModel dependencies
- Test accessibility features

## Future Enhancements

### Potential Improvements
1. **API Integration**: Replace InMemoryRepository with HTTP-based repository
2. **Caching**: Add caching layer in repository
3. **Optimistic Updates**: Implement optimistic UI updates
4. **Real-time Updates**: Add WebSocket support for real-time task updates
5. **Offline Support**: Implement offline-first architecture
6. **Advanced Validation**: Add server-side validation integration

### Scalability Considerations
- Feature modules can be easily added following the same pattern
- Shared utilities can be extracted to separate packages
- Repository implementations can be swapped without affecting other layers
- State management can be extended with additional stores

## Conclusion

The MVVM architecture provides a solid foundation for the Vue.js application with clear separation of concerns, improved testability, and better maintainability. The feature-first organization makes it easy to understand and extend the codebase while following Vue.js best practices.
