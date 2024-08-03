module.exports = {
  testMatch: [
    "**/src/__tests__/**/*.[jt]s?(x)"
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@testing-library/)"
  ],
  testEnvironment: 'jest-environment-jsdom',
};