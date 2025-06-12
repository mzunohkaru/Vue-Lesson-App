import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskForm from './TaskForm.vue'

describe('TaskForm.vue', () => {
  // 入力フィールドとボタンがレンダリングされることを確認します
  it('renders the input field and button', () => {
    const wrapper = mount(TaskForm)
    expect(wrapper.find('input[type="text"].task-input').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"].add-task-button').exists()).toBe(true)
  })

  // フォーム送信時にタイトルと共に "add-task" イベントが発行されることを確認します
  it('emits "add-task" event with the title when form is submitted', async () => {
    const wrapper = mount(TaskForm)
    const input = wrapper.find('input[type="text"].task-input')
    const expectedTitle = 'New test task'

    await input.setValue(expectedTitle)
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('add-task')).toBeTruthy()
    expect(wrapper.emitted('add-task')![0]).toEqual([expectedTitle])
  })

  // "add-task" イベント発行後に入力フィールドがクリアされることを確認します
  it('clears the input field after emitting "add-task"', async () => {
    const wrapper = mount(TaskForm)
    const input = wrapper.find('input[type="text"].task-input')

    await input.setValue('Another task')
    await wrapper.find('form').trigger('submit.prevent')

    expect(input.element.value).toBe('')
  })

  // タイトルが空または空白の場合に "add-task" イベントが発行されないことを確認します
  it('does not emit "add-task" event if title is empty or whitespace', async () => {
    const wrapper = mount(TaskForm)
    const input = wrapper.find('input[type="text"].task-input')

    // 空文字列でテスト
    await input.setValue('')
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted('add-task')).toBeFalsy()

    // 空白でテスト
    await input.setValue('   ')
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted('add-task')).toBeFalsy()
  })
})
