import { defineComponent, h } from 'vue'

import { mount } from  '../framework'
import { App } from '../app/App'
import { TodoItem } from '../app/TodoItem'
import { Toggle } from '../app/Toggle'
import { Todo } from '../app/types'

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
    await button.trigger('click')

    expect(todo.classes()).toContain('todo-item-complete')
    expect(button.element.disabled).toBe(true)
  })
})

describe('TodoItem', () => {
  it('emits an event with a Todo with complete is clicked', async () => {
    const todo: Todo = {
      id: 1,
      text: 'Do some work',
      complete: false
    }

    const onToggleMock = jest.fn()
    const Parent = defineComponent({
      render() {
        return h(TodoItem, {
          todo,
          onToggle: onToggleMock
        })
      }
    })

    const wrapper = mount(Parent)

    await wrapper.find('button').trigger('click')

    expect(onToggleMock).toHaveBeenCalledWith(todo)
  })
})

describe('Toggle', () => {
  it('hides message when visible is false', () => {
    const wrapper = mount(Toggle, {
      props: {
        visible: false
      }
    })

    expect(wrapper.find('#message')).toBeFalsy()
  })

  it('reveals message when visible is true', () => {
    const wrapper = mount(Toggle, {
      props: {
        visible: true
      }
    })

    expect(wrapper.find('#message')).toBeTruthy()
  })
})