import { ComponentPublicInstance, createApp, VNode, defineComponent, h } from 'vue'

import { VueWrapper, createWrapper } from './vue-wrapper'

interface MountingOptions<Props> {
  props?: Props
  slots?: VNode
}

export function mount<P>(
  component: new () => ComponentPublicInstance<P>,
  options?: MountingOptions<P>
): VueWrapper {

  document.getElementsByTagName('html')[0].innerHTML = '';
  const el = document.createElement('div')
  el.id = 'app'
  document.body.appendChild(el)

  const Parent = (props?: P) => defineComponent({
    render() {
      return h(component, props, options && options.slots && (() => options.slots))
    }
  })

  const vm = createApp().mount(Parent(options && options.props), '#app')

  return createWrapper(vm)
}