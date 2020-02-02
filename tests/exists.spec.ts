import { h, defineComponent } from 'vue'

import { mount } from '../framework'
import Hello from './components/Hello.vue'

describe('exists', () => {
  it('returns false when element does not exist', () => {
    const wrapper = mount(Hello)
    expect(wrapper.find('#not-msg').exists()).toBe(false)
  })

  it('returns true when element does exist', () => {
    const wrapper = mount(Hello)
    console.log(wrapper.find('#msg'))
    expect(wrapper.find('#msg').exists()).toBe(true)
  })
})