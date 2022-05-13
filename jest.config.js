module.exports = {
  roots: ['<rootDir>/tests'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    "@constraints(.*)": '<rootDir>/src/constraints/$1',
    "@controllers(.*)": '<rootDir>/src/controllers/$1',
    "@factories(.*)": '<rootDir>/src/factories/$1',
    "@infra(.*)": '<rootDir>/src/infra/$1',
    "@models(.*)": '<rootDir>/src/models/$1',
    "@presentation(.*)": '<rootDir>/src/presentation/$1',
    "@protocols(.*)": '<rootDir>/src/protocols/$1',
    "@services(.*)": '<rootDir>/src/services/$1',
    "@utils(.*)": '<rootDir>/src/utils/$1',
  }
}