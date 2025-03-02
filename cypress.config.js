const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "defaultCommandTimeout": 10000,
    "responseTimeout": 15000,
    "baseUrl": "http://localhost:3000"
  },
});
