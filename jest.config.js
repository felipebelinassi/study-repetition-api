module.exports = {
  displayName: 'unit-tests',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  testMatch: ['**/tests/unit/**/(*.)+(spec|test).+(ts|tsx)'],
  clearMocks: true,
  setupFiles: ['reflect-metadata', 'dotenv/config'],
};
