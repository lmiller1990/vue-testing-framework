import { defineComponent, h, ref } from 'vue'

import { TodoItem } from './TodoItem'
import { Toggle } from './Toggle'
import { ItemWithSlots } from './ItemWithSlots'
import { Message } from './Message'
import { Todo } from './types'

export const App = defineComponent({
  name: 'App',

  components: {
    TodoItem,
    Toggle,
    Message,
    ItemWithSlots
  },

  setup() {
    const todos = ref<Todo[]>([
      { id: 1, text: 'Learn Vue.js 3', complete: false },
      { id: 2, text: 'Update VTU to work with Vue.js 3', complete: false },
      { id: 3, text: 'Port Vuex to Vue 3', complete: false },
    ])

    const toggleComplete = (todo: Todo) => {
      const idx = todos.value.findIndex(x => x.id === todo.id) 
      todos.value[idx].complete = !todos.value[idx].complete
    }

    const visible = ref(true)
    const toggleVisible = () => visible.value = !visible.value

    return () => h(
      'div', 
      {}, 
      [
        h('h3', {}, 'TodoItem.ts - trigger, find, emit'),
        todos.value.map(todo => 
          h(
            TodoItem, 
            { 
              todo: todo, 
              onToggle: () => toggleComplete(todo) 
            }
          )
        ),
        h('hr'),
        h('h3', {}, 'Toggle.ts - exists'),
        h(
          Toggle, 
          { 
            visible: visible.value, 
            onToggleVisible: toggleVisible
          }
        ),
        h('hr'),
        h('h3', {}, 'Slots - default'),
        h(ItemWithSlots, {}, () => h(Message))
      ],
    )
  }
})