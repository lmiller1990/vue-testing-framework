import { defineComponent, h, createApp } from 'vue'

export const Component = defineComponent({
  name: 'App',

  setup() {
    return {
      msg: 'world',
      count: 0,
    }
  },

  render() {
    return h(
      'div', {}, [
      h('span', { onClick: () => this.count++ }, `Count is ${this.count}`)
    ]
    )
  }
})

document.addEventListener('DOMContentLoaded', () => {
  createApp().mount(Component, '#app')
})