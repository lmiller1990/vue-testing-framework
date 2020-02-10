import { defineComponent, h, getCurrentInstance } from 'vue'

import { Todo } from './types'

export const TodoItem = defineComponent({
  name: 'TodoItem',

  props: {
    todo: {
      type: Object as () => Todo,
      required: true
    }
  },


  setup(props, ctx) {
    const originalEmit = ctx.emit
    ctx.emit = (event: string, ...args: unknown[]) => {
      console.log('Event is', event)
      return originalEmit.call(getCurrentInstance(), event, ...args)
    }

    return () => {
      return h(
          'div', { className: `todo-item ${props.todo.complete ? 'todo-item-complete' : ''}` }, [
          h('div', {}, props.todo.text),
          h('button', { 
            onClick: () => {
              ctx.emit('toggle', props.todo)
            },
            disabled: props.todo.complete
          }, 'Complete')
        ]
      )
    }
  }
})