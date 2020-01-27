import { defineComponent, h } from 'vue'

export const ItemWithSlots = defineComponent({
  name: 'App',

  render() {
    return h('div', {}, [this.$slots.default()])
  }
})