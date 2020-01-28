import { h, defineComponent } from 'vue'

import { mount } from '../framework'

describe('exists', () => {
  it('works', () => {
    const Comp = defineComponent({
      render() {
        return h('div')
      }
    })

    const wrapper = mount(Comp)

    expect(wrapper.find('span').exists()).toBe(true)
  })
})