import { WrapperAPI } from './types'

export class ErrorWrapper {
  selector: string

  constructor(selector: string) {
    this.selector = selector
  }

  wrapperError(method: string): Error {
    return Error(`Cannot call ${method} on an empty wrapper.`)
  }

  classes() {
    throw this.wrapperError('classes')
  }

  find() {
    throw this.wrapperError('find')
  }

  findAll() {
    throw this.wrapperError('findAll')
  }

  exists() {
    return false
  }
}