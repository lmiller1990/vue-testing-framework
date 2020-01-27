import { defineComponent, h } from 'vue'

export const Message = defineComponent({
  name: 'Message',

  props: {
    message: {
      type: String,
      default: 'Hello World',
    }
  },

  setup(props) {
    return () => h('div', {}, props.message)
  }
})