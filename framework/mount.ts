import { ComponentPublicInstance, createApp, VNode, defineComponent, h } from 'vue'

import { Hashmap } from './types'
import { VueWrapper, createWrapper } from './vue-wrapper'

type Slot = VNode | string

interface MountingOptions<Props> {
  props?: Props
  slots?: {
    default?: Slot
    [key: string]: Slot
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

  const slots = options?.slots &&
    Object.entries(options.slots).reduce<Hashmap<() => VNode | string>>((acc, [name, fn]) => {
    acc[name] = () => fn
    return acc
  }, {})

  const Parent = (props?: P) => defineComponent({
    render() {
      return h(component, props, slots)
    }
  })

  const vm = createApp(Parent(options && options.props)).mount('#app')

  return createWrapper(vm)
}