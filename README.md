## Vue Testing Framework

Experimental Vue 3 testing framework build for a first class TypeScript development experience.

## What is this?

A simple framework for testing Vue 3 apps. Parts of it will likely become the next iteration for Vue Test Utils.

## Goals

- Support Vue.js 3.0
- Excellent TypeScript integration - no need for typecasting, `!`, `ts-ignore` etc.
- Avoid the need to access the raw `vm` element
- Excellent documentation
- Fix pain points of VTU beta (stubs, shallowMount, slots, testing third party components libs)

## Contributing

Take a look at the existing issues, or open one of your own.

## Supported Features/API

### Typesafe mounting options

```ts
interface Todo {
  id: number
  text: string
  complete: boolean
}

const TodoItem = defineComponent({
  props: {
    todo: {
      type: Object as () => Todo,
      required: true
    }
  }
})

const wrapper = mount(TodoItem, {
  props: {
    todo: {
      id: 1,
      complete: false, 
      //  IDE will warn you!
      // Property 'text' is missing in type '{ id: number; complete: boolean; }' 
      // but required in type 'Todo'.ts(2741)
    }
  }
})
```

### Getting html/text with `html` and `text`

```ts
test('html, text', async () => {
  const Component = defineComponent({
    render() {
      return h('div', {}, 'Text content')
    }
  })

  const wrapper = mount(Component)

  expect(wrapper.html()).toBe('<div>Text content</div>') // via $el.outerHTML
  expect(wrapper.text()).toBe('Text content') // via $el.textContent
})
```
### Finding elements with `find` and `findAll`, asserting presence with `exists`

```ts
test('find', () => {
  const Component = defineComponent({
    render() {
      return h('div', {}, [h('span', { id: 'my-span' })])
    }
  })

  const wrapper = mount(Component)
  expect(wrapper.find('#my-span').exists()).toBe(true)
})

test('findAll', () => {
  const Component = defineComponent({
    render() {
      return h('div', {}, [
        h('span', { className: 'span' }),
        h('span', { className: 'span' })
      ])
    }
  })

  const wrapper = mount(Component)
  expect(wrapper.findAll('.span')).toHaveLength(2)
})
```

### Simulating events with `trigger`

```ts
test('trigger', async () => {
  const Component = defineComponent({
    setup() {
      return {
        count: ref(0)
      }
    },

    render() {
      return h('div', {}, [
        h('p', {}, `Count: ${this.count}`),
        h('button', { onClick: () => this.count++ })
      ])
    }
  })

  const wrapper = mount(Component)
  await wrapper.find('button').trigger('click')

  expect(wrapper.find('p').text()).toBe('Count: 1')
})
```

### Testing classes with `classes`

```ts
test('classes', () => {
  const Component = defineComponent({
    render() {
      return h('div', {}, [h('span', { class: 'my-class-name' })])
    }
  })

  const wrapper = mount(Component)

  expect(wrapper.find('.my-class-name').classes()).toContain('my-class-name')
})
```

### Passing default and named slots

```ts
test('slots - default and named', () => {
  const Component = defineComponent({
    render() {
      return h('div', {}, [
        h('div', {}, this.$slots.foo()),
        h('div', {}, this.$slots.default())
      ])
    }
  })

  const wrapper = mount(Component, {
    slots: {
      default: 'Default',
      foo: h('h1', {}, 'Named Slot')
    }
  })

  expect(wrapper.html()).toBe('<div><div><h1>Named Slot</h1></div><div>Default</div></div>')
})
```

### Tracking Events with `emitted`

```ts
test('emitted', () => {
  const Component = defineComponent({
    render() {
      return h(
        'div', [
        h('button', { onClick: () => this.$emit('hello', 'foo', 'bar') })
      ]
      )
    }
  })

  const wrapper = mount(Component)

  wrapper.find('button').trigger('click')

  expect(wrapper.emitted().hello[0]).toEqual(['foo', 'bar'])
})
  ```


### Supports SFCs using lang="ts" via [Vue Jest Transformer](https://github.com/lmiller1990/vue-jest-transformer) 

```vue
<!-- Hello.vue-->
<template>
  <div id="root">
    <div id="msg">
      {{ msg }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Hello',

  setup() {
    return {
      msg: ref('Hello world')
    }
  }
})
</script>
```

```ts
import Hello from './components/Hello.vue'

describe('sfc', () => {
  it('mounts an sfc via vue-test-transformer', () => {
    const wrapper = mount(Hello)
    expect(wrapper.find('#msg').text()).toBe('Hello world')
  })
})
```