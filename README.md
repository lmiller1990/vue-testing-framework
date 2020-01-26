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