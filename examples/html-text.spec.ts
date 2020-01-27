import { defineComponent, h, nextTick, ref } from 'vue'

import { mount } from '../framework'

test('html, text', async () => {
  const Component = defineComponent({
    render() {
      return h('div', {}, 'Text content')
    }
  })

  const wrapper = mount(Component)
  await nextTick()

  expect(wrapper.html()).toBe('<div>Text content</div>')
  expect(wrapper.text()).toBe('Text content')
})