import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Resolve o alias "@/..." (igual ao tsconfig) para os testes do motor.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
