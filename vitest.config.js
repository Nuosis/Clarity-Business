import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // This enables `test`, `expect`, and other test functions globally
    environment: 'node', // Use 'node' if you're testing backend logic, like FileMaker API calls
  },
});
