import { defineComponent, h } from 'vue'

export const Toggle = defineComponent({
  name: 'Toggle',

  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },

  setup(props, ctx) {
    return () => {
      const btn = h(
        'button', 
        { 
          onClick: () => ctx.emit('toggleVisible')
        },
        'Toggle Visible'
      )

      const message = props.visible && h('div', {}, 'This is visible')

      return h('div', {}, [btn, message])
    }
  }
})