import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskForm from './TaskForm.vue'

describe('TaskForm.vue', () => {
  it('renders the input field and button', () => {
    const wrapper = mount(TaskForm)
    expect(wrapper.find('input[type="text"].task-input').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"].add-task-button').exists()).toBe(true)
  })

  it('emits "add-task" event with the title when form is submitted', async () => {
    const wrapper = mount(TaskForm)
    const input = wrapper.find('input[type="text"].task-input')
    const expectedTitle = 'New test task'

    await input.setValue(expectedTitle)
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('add-task')).toBeTruthy()
    expect(wrapper.emitted('add-task')![0]).toEqual([expectedTitle])
  })

  it('clears the input field after emitting "add-task"', async () => {
    const wrapper = mount(TaskForm)
    const input = wrapper.find('input[type="text"].task-input')

    await input.setValue('Another task')
    await wrapper.find('form').trigger('submit.prevent')

    expect(input.element.value).toBe('')
  })

  it('does not emit "add-task" event if title is empty or whitespace', async () => {
    const wrapper = mount(TaskForm)
    const input = wrapper.find('input[type="text"].task-input')

    // Test with empty string
    await input.setValue('')
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted('add-task')).toBeFalsy()

    // Test with whitespace
    await input.setValue('   ')
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted('add-task')).toBeFalsy()
  })
})
