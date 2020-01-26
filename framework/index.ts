import { ComponentPublicInstance, createApp, h } from 'vue'

interface MountingOptions<Props> {
  props: Props
}

interface WrapperAPI {
  classes: () => string[]
  find<T extends Element>(selector: string): DOMWrapper<T>
  findAll<T extends Element>(selector: string): DOMWrapper<T>[]
}

class DOMWrapper<ElementType extends Element> implements WrapperAPI {
  element: ElementType

  constructor(element: ElementType) {
    this.element = element
  }

  classes() {
    return Array.from(this.element.classList)
  }

  text() {
    return this.element.textContent?.trim()
  }

  html() {
    return this.element.outerHTML
  }

  find<T extends Element>(selector: string) {
    const result = this.element.querySelector<T>(selector)
    if (result) {
      return new DOMWrapper<T>(result)
    }
  }

  findAll<T extends Element>(selector: string): DOMWrapper<T>[] {
    return Array.from(this.element.querySelectorAll<T>(selector)).map(x => new DOMWrapper(x))
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

class VueWrapper implements WrapperAPI {
  vm: ComponentPublicInstance

  constructor(vm: ComponentPublicInstance) {
    this.vm = vm
  }

  classes(): string[] {
    throw Error('TODO: Implement VueWrapper#classes')
  }

  html() {
    return this.vm.$el.innerHTML
  }


  find<T extends Element>(selector: string): DOMWrapper<T> | undefined {
    const result = this.vm.$el.querySelector(selector) as T
    if (result) {
      return new DOMWrapper(result)
    }
  }

  findAll<T extends Element>(selector: string): DOMWrapper<T>[] {
    const results = (this.vm.$el as Element).querySelectorAll<T>(selector)
    return Array.from(results).map(x => new DOMWrapper(x))
  }

  trigger(selector: string) { 
    throw Error('TODO: Implement VueWrapper#trigger')
  }
}

function createWrapper(vm: ComponentPublicInstance): VueWrapper {
  return new VueWrapper(vm)
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