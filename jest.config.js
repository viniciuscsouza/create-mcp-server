export default {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  transform: {
    '^.+\.tsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(chalk|inquirer)/)']
};