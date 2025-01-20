import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/tests/end-to-end/**', 'prisma']] // this will run the prisma environment for the tests in src/tests/end-to-end => prisma-test-environment.ts
  }
});
