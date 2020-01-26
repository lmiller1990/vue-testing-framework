import { nextTick } from 'vue'

import { mount } from  './index'
import { App } from '../app/App'

describe('App', () => {
  it('renders 3 todos', () => {
    const wrapper = mount(App)
    const todos = wrapper.findAll('.todo-item')

    expect(todos).toHaveLength(3)
  })

  it('completes a todo', async () => {
    const wrapper = mount(App)
    const todo = wrapper.findAll('.todo-item')[0]

    const button = todo.find<HTMLButtonElement>('button')
    button.trigger('click')
    await nextTick()

    expect(todo.classes()).toContain('todo-item-complete')
    expect(button.element.disabled).toBe(true)
  })
})