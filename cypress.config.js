const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    retries: 2,
    baseUrl: "http://localhost:80",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    NODE_ENV: "test",
  },
  chromeWebSecurity: false,
});
