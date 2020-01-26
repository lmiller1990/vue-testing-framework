import { nextTick } from 'vue'
import { Component, mount } from './index'

test('does various things', async () => {
  const wrapper = mount(Component)
  expect(wrapper.find('span').text()).toBe('Count is 0')

  wrapper.find('span').trigger('click')
  await nextTick()

  expect(wrapper.find('span').text()).toBe('Count is 1')
})