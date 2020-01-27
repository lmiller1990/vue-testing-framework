import { ComponentPublicInstance, createApp } from 'vue'

import { VueWrapper, createWrapper } from './vue-wrapper'

interface MountingOptions<Props> {
  props: Props
}

export function mount<P>(
  component: new () => ComponentPublicInstance<P>,
  options?: MountingOptions<P>
): VueWrapper {

  document.getElementsByTagName('html')[0].innerHTML = '';
  const el = document.createElement('div')
  el.id = 'app'
  document.body.appendChild(el)

  const vm = createApp().mount(component, '#app', {
    ...options && options.props ? options.props : {}
  })

  return createWrapper(vm)
}