import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    viewportWidth: 1440,
    viewportHeight: 1024,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
