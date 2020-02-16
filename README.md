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

## Codebase and Contributing

- There are some existing issues; take a look, and ask if you have questions.
- Install deps with `yarn install`.
- Run the tests with `yarn test`.
- There is a simple app you can run to try things out/sanity check you component code is actually valid and working in a browser. Run it with `yarn dev` and open `index.html` in your browser (no hot reload, you need to refresh the page to see you changes)
- NOTE: one of the emit specs is currently failing; this will be fixed with Vue3 alpha 5. See the comment above the failing spec

## Supported Features/API

See here (work in progress): https://lmiller1990.github.io/vue-testing-framework/api-reference/
