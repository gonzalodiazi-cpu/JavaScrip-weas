import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@src",
        replacement: path.resolve(process.cwd(), "src"),
      },
    ],
  },
});