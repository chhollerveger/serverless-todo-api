module.exports = {
  roots: ['<rootDir>/tests'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/tests(.*)': '<rootDir>/tests/$1'
  }
}