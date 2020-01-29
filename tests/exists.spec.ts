import { h, defineComponent } from 'vue'

import { mount } from '../framework'

describe('exists', () => {
  it('returns false when element does not exist', () => {
    const Comp = defineComponent({
      render() {
        return h('div')
      }
    })

    const wrapper = mount(Comp)
    expect(wrapper.find('span').exists()).toBe(false)
  })

  it('returns true when element does exist', () => {
    const Comp = defineComponent({
      render() {
        return h('div', [h('span')])
      }
    })

    const wrapper = mount(Comp)
    expect(wrapper.find('span').exists()).toBe(true)
  })
})