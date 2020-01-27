import { defineComponent, h } from 'vue'

import { mount } from '../framework'

export const ItemWithSlots = defineComponent({
  name: 'ItemWithSlots',
  render() {
    return h('div', {}, this.$slots.default())
  }
})

test('slots - default', () => {
  const wrapper = mount(ItemWithSlots, {
    slots: {
      default: h('span', {}, 'Default Slot')
    }
  })

  expect(wrapper.html()).toBe('<div><span>Default Slot</span></div>')
})

test('slots - named', () => {
  const Comp = defineComponent({
    render() {
      return h('div', {}, this.$slots.foo())
    }
  })

  const wrapper = mount(Comp, {
    slots: {
      foo: h('span', {}, 'Foo')
    }
  })

  expect(wrapper.html()).toBe('<div><span>Foo</span></div>')
})
