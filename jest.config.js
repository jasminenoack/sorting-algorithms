module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/spec/**/*.ts'],
  moduleNameMapper: {
    '^d3$': '<rootDir>/node_modules/d3/dist/d3.js'
  }
};
