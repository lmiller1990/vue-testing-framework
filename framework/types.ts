import { DOMWrapper } from './dom-wrapper'

export interface WrapperAPI {
  classes: () => string[]
  find<T extends Element>(selector: string): DOMWrapper<T>
  findAll<T extends Element>(selector: string): DOMWrapper<T>[]
}

export interface Hashmap<T> {
  [key: string]: T
}
