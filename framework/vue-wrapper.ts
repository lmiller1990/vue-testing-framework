import { ComponentPublicInstance } from 'vue'

import { DOMWrapper } from './dom-wrapper'
import { WrapperAPI } from './types'

export class VueWrapper implements WrapperAPI {
  vm: ComponentPublicInstance

  constructor(vm: ComponentPublicInstance) {
    this.vm = vm
  }

  classes(): string[] {
    throw Error('TODO: Implement VueWrapper#classes')
  }

  html() {
    return this.vm.$el.outerHTML
  }

  text() {
    return this.vm.$el.textContent
  }

  findComponent(name: string): any {
    // @ts-ignore
    for (const el of Array.from(this.vm.$root.subTree.children)) {
        console.log(el) 
      }
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

export function createWrapper(vm: ComponentPublicInstance): VueWrapper {
  return new VueWrapper(vm)
}