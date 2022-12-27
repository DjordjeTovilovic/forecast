/** @type {import('ts-jest').JestConfigWithTsJest} */
const jestConfig = {
  testMatch: ['./**/?(*.)+(spec|test).ts'],
  transform: { '\\.[jt]s?$': ['ts-jest', { tsconfig: { allowJs: true } }] },
  transformIgnorePatterns: ['node_modules/(?!get-port/.*)'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.[jt]s$': '$1',
  },
}

export default jestConfig
