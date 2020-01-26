import { defineComponent, h, ComponentPublicInstance, createApp } from 'vue'

export const Component = defineComponent({
  name: 'Component',

  setup() {
    return {
      msg: 'world',
      count: 0,
    }
  },

  render() {
    return h(
      'div', {}, [
      h('span', { onClick: () => this.count++ }, `Count is ${this.count}`)
    ]
    )
  }
})

interface WrapperBaseAPI {
  find: (selector: string) => DOMWrapper | VueWrapper | undefined
  trigger: (eventString: string) => void
}

class DOMWrapper implements WrapperBaseAPI {
  element: Element

  constructor(element: Element) {
    this.element = element
  }

  text() {
    return this.element.textContent?.trim()
  }

  html() {
    return this.element.outerHTML
  }

  find(selector: string) {
    const result = this.element.querySelector(selector)
    if (result) {
      return new DOMWrapper(result)
    }
  }

  trigger(eventString: string) {
    const evt = document.createEvent('Event')
    evt.initEvent(eventString)

    if (this.element) {
      this.element.dispatchEvent(evt)
      return
    }
  }
}

class VueWrapper implements WrapperBaseAPI {
  vm: ComponentPublicInstance

  constructor(vm: ComponentPublicInstance) {
    this.vm = vm
  }

  find(selector: string) {
    const result = this.vm.$el.querySelector(selector) as Element
    if (result) {
      return new DOMWrapper(result)
    }
  }

  trigger(selector: string) { 
    throw Error('TODO: Implement VueWrapper#trigger')
  }
}

function createWrapper(vm: ComponentPublicInstance): VueWrapper {
  return new VueWrapper(vm)
}

export const mount = (component: new () => ComponentPublicInstance): VueWrapper => {
  document.getElementsByTagName('html')[0].innerHTML = '';
  const el = document.createElement('div')
  el.id = 'app'
  document.body.appendChild(el)

  const vm = createApp().mount(Component, '#app')

  return createWrapper(vm)
}