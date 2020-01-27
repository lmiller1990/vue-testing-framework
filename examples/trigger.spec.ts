import { defineComponent, h, nextTick, ref } from 'vue'

import { mount } from '../framework'

test('trigger', async () => {
  const Component = defineComponent({
    setup() {
      return {
        count: ref(0)
      }
    },

    render() {
      return h('div', {}, [
        h('p', {}, `Count: ${this.count}`),
        h('button', { onClick: () => this.count++ })
      ])
    }
  })

  const wrapper = mount(Component)
  wrapper.find('button').trigger('click')
  await nextTick()

  expect(wrapper.find('p').text()).toBe('Count: 1')
})