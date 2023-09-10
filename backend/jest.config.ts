/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import jestModuleNameMapper from 'jest-module-name-mapper';
export default {
  clearMocks: true,
  roots: ['<rootDir>/test'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleNameMapper: jestModuleNameMapper()
};
