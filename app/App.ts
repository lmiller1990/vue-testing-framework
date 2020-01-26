import { defineComponent, h, ref } from 'vue'

import { TodoItem } from './TodoItem'
import { Todo } from './types'

export const App = defineComponent({
  name: 'App',

  components: {
    TodoItem
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

    return () => h(
      'div', 
      {}, 
      [
        todos.value.map(todo => 
          h(
            TodoItem, 
            { 
              todo: todo, 
              onToggle: () => toggleComplete(todo) 
            }
          )
        )
      ]
    )
  }
})