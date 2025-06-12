import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoPage from './TodoPage.vue'
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'

// TaskListをモック化してテストを単純化し、内部ロジックの複雑さを回避します
vi.mock('../components/TaskList.vue', () => {
  return {
    default: {
      props: ['tasks'],
      template: '<div class="mocked-task-list">{{ tasks.length }} tasks</div>',
    }
  }
})

describe('TodoPage.vue', () => {
  // TaskForm および TaskList コンポーネントがレンダリングされることを確認します
  it('renders TaskForm and TaskList components', () => {
    const wrapper = mount(TodoPage)
    expect(wrapper.findComponent(TaskForm).exists()).toBe(true)
    expect(wrapper.findComponent(TaskList).exists()).toBe(true)
  })

  // TaskForm が "add-task" イベントを発行したときに新しいタスクが tasks 配列に追加されることを確認します
  it('adds a new task to the tasks array when TaskForm emits "add-task"', async () => {
    const wrapper = mount(TodoPage)
    const taskFormComponent = wrapper.findComponent(TaskForm)

    const initialTasksCount = wrapper.vm.tasks.length
    const newTaskTitle = 'A new task from test'

    // TaskForm からのイベント発行をシミュレートします
    await taskFormComponent.vm.$emit('add-task', newTaskTitle)

    // tasks 配列が更新されたことを確認します
    expect(wrapper.vm.tasks.length).toBe(initialTasksCount + 1)
    const newTask = wrapper.vm.tasks[wrapper.vm.tasks.length - 1]
    expect(newTask.title).toBe(newTaskTitle)
    expect(newTask.completed).toBe(false)
    // ID は Date.now() を使用して生成されるため、その存在のみを確認します
    expect(newTask.id).toBeDefined()
  })

  // 新しいタスクが追加されたときに、更新されたタスクリストが TaskList に渡されることを確認します
  it('passes the updated tasks list to TaskList when a new task is added', async () => {
    const wrapper = mount(TodoPage)
    const taskFormComponent = wrapper.findComponent(TaskForm)
    const taskListComponent = wrapper.findComponent(TaskList)

    const newTaskTitle = 'Another new task'
    await taskFormComponent.vm.$emit('add-task', newTaskTitle)

    // TaskList が更新されたタスクを受け取ることを確認します
    // モックコンポーネントの場合、プロパティを直接確認するか、単純化されたテンプレートにどのように反映されるかを確認します
    expect(taskListComponent.props('tasks')).toHaveLength(wrapper.vm.tasks.length)
    // モックのレンダリング出力の例を確認します
    expect(taskListComponent.html()).toContain(`${wrapper.vm.tasks.length} tasks`)
  })

  // タイトルが空の場合にタスクが追加されないことを確認します
  it('does not add a task if the title is empty', async () => {
    const wrapper = mount(TodoPage)
    const taskFormComponent = wrapper.findComponent(TaskForm)
    const initialTasksCount = wrapper.vm.tasks.length

    await taskFormComponent.vm.$emit('add-task', '') // 空のタイトル

    expect(wrapper.vm.tasks.length).toBe(initialTasksCount)
  })
})
