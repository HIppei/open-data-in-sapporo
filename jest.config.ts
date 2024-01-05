import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  coverageProvider: 'v8',
  clearMocks: true,
  resetMocks: true,
};

export default config;
