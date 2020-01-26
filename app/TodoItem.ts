import { defineComponent, h } from 'vue'

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
    return () => {
      return h(
          'div', { className: `todo-item ${props.todo.complete ? 'todo-item-complete' : ''}` }, [
          h('div', {}, props.todo.text),
          h('button', { 
            onClick: () => ctx.emit('toggle'),
            disabled: props.todo.complete
          }, 'Complete')
        ]
      )
    }
  }
})