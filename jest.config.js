module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/src/main/**', '!**/src/**/index.ts', '!**/src/**/*-protocols.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: { '.*\\.ts$': 'ts-jest' }
}
