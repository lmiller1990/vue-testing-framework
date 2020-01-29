import { DOMWrapper } from './dom-wrapper'
import { ErrorWrapper } from './error-wrapper'
import { VueWrapper } from './vue-wrapper'

export interface WrapperAPI {
  classes: () => string[] | ErrorWrapper
  find<T extends Element>(selector: string): DOMWrapper<T> | ErrorWrapper
  findAll<T extends Element>(selector: string): DOMWrapper<T>[] | ErrorWrapper
  exists: () => boolean
}

export interface Hashmap<T> {
  [key: string]: T
}

export type Wrapper = VueWrapper | DOMWrapper | ErrorWrapper
