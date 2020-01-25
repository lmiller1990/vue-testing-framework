import { Component, mount } from './index'

test('It works', () => {
  const wrapper = mount(Component)
  expect(wrapper.find('span').text()).toBe('Count is 0')
})