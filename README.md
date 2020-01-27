## Vue Testing Framework

Experimental Vue 3 testing framework build for a first class TypeScript development experience.

## What is this?

Just an experiment. I want to try building some small apps with Vue 3, testing them as I go. Upgrading Vue Test Utils to work with Vue 3 will take some time and consideration. This is me exploring what a less featureful, TypeScript first testing framework might look like.

This is **not** the next iteration of VTU. It's just something I'm working on, to learn better how to build a testing framework. This will help me make VTU better in the future. No-one wants to use someone's side project or learning project in production - which is why I'm exploring ideas here. I hope VTU will benefit from my learnings.

If you see some code that looks suspect/could be improved, you can make an issue/PR or contact me on Vueland, or send me an email.

## Goals

- Testing components and applications in an "end to end" manner. I like the philosophy of [Testing Library](https://testing-library.com/).
- Support Vue.js 3.0
- Excellent TypeScript integration - no need for typecasting, `!`, `ts-ignore` etc.
- "The more your tests resemble the way your software is used, the more confidence they can give you" - Kent Dodds
- Avoid the need to access the raw `vm` element
- Support SFCs by `vue-jest`

## Features I want to try and support

- Capture emitted events
- Good API for testing components with slots (VTU pain point)
- Alternative to `shalllowMount`
- Tools for testing composition API components

## Supported Features

### getting html/text with `html` and `text`

```ts
test('html, text', async () => {
  const Component = defineComponent({
    render() {
      return h('div', {}, 'Text content')
    }
  })

  const wrapper = mount(Component)
  await nextTick()

  expect(wrapper.html()).toBe('<div>Text content</div>') // via $el.outerHTML
  expect(wrapper.text()).toBe('Text content') // via $el.textContent
})
```

### finding elements with `find` and `findAll`

```ts
test('find', () => {
  const Component = defineComponent({
    render() {
      return h('div', {}, [h('span', { id: 'my-span' })])
    }
  })

  const wrapper = mount(Component)
  expect(wrapper.find('#my-span')).toBeTruthy()
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

### simulating events with `trigger`

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
  wrapper.find('button').trigger('click')
  await nextTick()

  expect(wrapper.find('p').text()).toBe('Count: 1')
})
```

### testing classes with `classes`

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