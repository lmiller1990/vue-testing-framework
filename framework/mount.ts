import { ComponentPublicInstance, createApp, VNode, defineComponent, h } from 'vue'

import { VueWrapper, createWrapper } from './vue-wrapper'

interface MountingOptions<Props> {
  props?: Props
  slots?: {
    default?: VNode | string
    [key: string]: VNode | string
  }
}

export function mount<P>(
  component: new () => ComponentPublicInstance<P>,
  options?: MountingOptions<P>
): VueWrapper {

  document.getElementsByTagName('html')[0].innerHTML = '';
  const el = document.createElement('div')
  el.id = 'app'
  document.body.appendChild(el)

  const defaultSlot = options?.slots?.default

  const namedSlots = {}
  if (options && options.slots) {
    for (const [slotName, slotFn] of Object.entries(options.slots)) {
      namedSlots[slotName] = () => slotFn
    }
  }

  const Parent = (props?: P) => defineComponent({
    render() {
      return h(component, props, {...namedSlots, default: () => defaultSlot})
    }
  })

  const vm = createApp().mount(Parent(options && options.props), '#app')

  return createWrapper(vm)
}