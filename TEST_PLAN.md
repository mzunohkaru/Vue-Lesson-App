# Test Plan

## 1. Overview

This document outlines the testing strategy for the Vue.js components within this project. The primary goal is to ensure that components render correctly, respond to user interactions as expected, and manage state appropriately.

Testing is performed using [Vitest](https://vitest.dev/) as the test runner and [Vue Test Utils](https://test-utils.vuejs.org/) for component mounting and interaction.

## 2. Test Files Naming Convention

Test files are named using the pattern `__ComponentName__.spec.ts` and are located alongside the components they test or in a relevant `pages` directory.

## 3. Component Tests

### 3.1. `src/components/TaskForm.vue`

Tested by: `src/components/__TaskForm__.spec.ts`

This component is responsible for allowing users to input and submit new tasks.

**Test Cases:**

*   **Renders input field and button:**
    *   Verifies that the text input field for the task title is present.
    *   Verifies that the submit button is present.
*   **Emits "add-task" event with title on submission:**
    *   Ensures that when the form is submitted with a valid title, the `add-task` event is emitted.
    *   Ensures the emitted event carries the correct task title as its payload.
*   **Clears input field after emitting "add-task":**
    *   Checks that the input field is reset (empty) after a task has been successfully submitted.
*   **Does not emit "add-task" if title is empty or whitespace:**
    *   Verifies that the `add-task` event is not emitted if the user attempts to submit the form with an empty title.
    *   Verifies that the `add-task` event is not emitted if the user attempts to submit the form with a title consisting only of whitespace.

### 3.2. `src/pages/TodoPage.vue`

Tested by: `src/pages/__TodoPage__.spec.ts`

This component serves as the main page for the To-Do application, integrating various child components like `TaskForm` and `TaskList`.

**Test Cases:**

*   **Renders TaskForm and TaskList components:**
    *   Confirms that both `TaskForm` and `TaskList` child components are rendered when `TodoPage` is mounted.
    *   Note: `TaskList` is mocked in these tests to simplify `TodoPage`'s unit tests and focus on its direct logic.
*   **Adds new task to array when TaskForm emits "add-task":**
    *   Simulates `TaskForm` emitting an `add-task` event with a new task title.
    *   Verifies that a new task object is added to the `tasks` array in `TodoPage`'s data.
    *   Checks that the new task has the correct title, its `completed` status is `false`, and it has an `id`.
*   **Passes updated tasks list to TaskList when a new task is added:**
    *   After a new task is added, verifies that the `tasks` prop passed to the (mocked) `TaskList` component is updated to include the new task.
*   **Does not add a task if the title is empty:**
    *   Simulates `TaskForm` emitting an `add-task` event with an empty title.
    *   Ensures that no new task is added to the `tasks` array, maintaining its original state.

## 4. Test Execution

Tests can be run using the following command from the project root:

```bash
npm run test
```

This command will execute all `*.spec.ts` files using Vitest.
