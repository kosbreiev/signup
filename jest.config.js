const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true, 
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}", 
    "!src/**/*.d.ts", 
    "!**/node_modules/**", 
  ],
  coverageDirectory: "coverage", 
};

module.exports = createJestConfig(customJestConfig);
