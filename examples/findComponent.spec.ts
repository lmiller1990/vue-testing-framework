import { defineComponent, h, render } from 'vue'

import { mount } from '../framework'

const CompA = defineComponent({
  name: 'CompA',
  render() {
    return h('div', { id: 'comp-a' }, [this.$slots?.default()])
  }
})

const CompB = defineComponent({
  name: 'CompB',
  render() {
    return h('div', { id: 'comp-b' }, [this.$slots?.default()])
  }
})

const CompC = defineComponent({
  name: 'CompC',
  render() {
    return h('div', { id: 'comp-c' }, [this.$slots?.default()])
  }
})


test('findComponent', () => {
  const Component = defineComponent({
    setup() {
      return () =>
        h('div', {}, [
          h(CompA, {}, () => 
            h(CompB, {}, () => 
              h(CompC, {}, () => 'Component C')
            )
          )
        ])
    }
  })

  const wrapper = mount(Component)

  expect(wrapper.find('#comp-c')).toBeTruthy()
  expect(wrapper.find('#comp-c').text()).toBe('Component C')
})
