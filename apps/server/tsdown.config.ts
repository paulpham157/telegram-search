import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    './src/index.ts',
  ],
  sourcemap: true,
  fixedExtension: true,
})
