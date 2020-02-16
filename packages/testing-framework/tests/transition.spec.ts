import { WithTransition } from '../app/WithTransition'
import { mount } from '../framework'

test('transition', async () => {
  const wrapper = mount(WithTransition)
  expect(wrapper.find('#message').exists()).toBe(false)

  await wrapper.find('button').trigger('click')
  expect(wrapper.find('#message')).toBeTruthy()
})