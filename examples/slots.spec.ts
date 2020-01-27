import { defineComponent, h } from 'vue'

import { mount } from '../framework'

export const ItemWithSlots = defineComponent({
  name: 'ItemWithSlots',
  render() {
    return h('div', {}, this.$slots.default())
  }
})

test('slots', () => {
  const wrapper = mount(ItemWithSlots, {
    slots: h('span', {}, 'Default Slot')
  })

  expect(wrapper.html()).toBe('<div><span>Default Slot</span></div>')
})
