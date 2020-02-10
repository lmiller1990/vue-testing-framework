import { defineComponent, h } from 'vue'

import { mount } from '../framework'

describe('emitted', () => {
  it('works with this.$emit', () => {
    const Component = defineComponent({
      render() {
        return h(
          'div', [
          h('button', { onClick: () => this.$emit('hello', 'foo', 'bar') })
        ]
        )
      }
    })

    const wrapper = mount(Component)
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted().hello[0]).toEqual(['foo', 'bar'])

    wrapper.find('button').trigger('click')
    expect(wrapper.emitted().hello[1]).toEqual(['foo', 'bar'])
  })

  it.only('works with context.emit', () => {
    const Component = defineComponent({
      name: 'ContextEmit',

      setup(props, ctx) {
        return () => 
          h(
            'div', [
            h('button', { onClick: () => ctx.emit('hello', 'foo', 'bar') })
          ]
        )
      }
    })

    const wrapper = mount(Component)
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted().hello[0]).toEqual(['foo', 'bar'])

    wrapper.find('button').trigger('click')
    expect(wrapper.emitted().hello[1]).toEqual(['foo', 'bar'])
  })
})