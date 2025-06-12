import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoPage from './TodoPage.vue'
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'

// Mock TaskList to simplify testing and avoid complexities of its internal logic
vi.mock('../components/TaskList.vue', () => {
  return {
    default: {
      props: ['tasks'],
      template: '<div class="mocked-task-list">{{ tasks.length }} tasks</div>',
    }
  }
})

describe('TodoPage.vue', () => {
  it('renders TaskForm and TaskList components', () => {
    const wrapper = mount(TodoPage)
    expect(wrapper.findComponent(TaskForm).exists()).toBe(true)
    expect(wrapper.findComponent(TaskList).exists()).toBe(true)
  })

  it('adds a new task to the tasks array when TaskForm emits "add-task"', async () => {
    const wrapper = mount(TodoPage)
    const taskFormComponent = wrapper.findComponent(TaskForm)

    const initialTasksCount = wrapper.vm.tasks.length
    const newTaskTitle = 'A new task from test'

    // Simulate the event emission from TaskForm
    await taskFormComponent.vm.$emit('add-task', newTaskTitle)

    // Check if the tasks array has been updated
    expect(wrapper.vm.tasks.length).toBe(initialTasksCount + 1)
    const newTask = wrapper.vm.tasks[wrapper.vm.tasks.length - 1]
    expect(newTask.title).toBe(newTaskTitle)
    expect(newTask.completed).toBe(false)
    // ID is generated using Date.now(), so we just check its existence
    expect(newTask.id).toBeDefined()
  })

  it('passes the updated tasks list to TaskList when a new task is added', async () => {
    const wrapper = mount(TodoPage)
    const taskFormComponent = wrapper.findComponent(TaskForm)
    const taskListComponent = wrapper.findComponent(TaskList)

    const newTaskTitle = 'Another new task'
    await taskFormComponent.vm.$emit('add-task', newTaskTitle)

    // Check if TaskList receives the updated tasks
    // For the mocked component, we check the prop directly or how it reflects in its simplified template
    expect(taskListComponent.props('tasks')).toHaveLength(wrapper.vm.tasks.length)
    // Example of checking rendered output of the mock
    expect(taskListComponent.html()).toContain(`${wrapper.vm.tasks.length} tasks`)
  })

  it('does not add a task if the title is empty', async () => {
    const wrapper = mount(TodoPage)
    const taskFormComponent = wrapper.findComponent(TaskForm)
    const initialTasksCount = wrapper.vm.tasks.length

    await taskFormComponent.vm.$emit('add-task', '') // Empty title

    expect(wrapper.vm.tasks.length).toBe(initialTasksCount)
  })
})
