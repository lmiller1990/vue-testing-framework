module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    __DEV__: true,
    __TEST__: true
  }
}


