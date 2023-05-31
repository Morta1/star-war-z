const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: ["cypress/e2e/*.cy.{js,jsx,ts,tsx}", "cypress/integration/api-tests/*.spec.{js,jsx,ts,tsx}",
      "cypress/unit/*.spec.{js,jsx,ts,tsx}"],
    baseUrl: "http://localhost:3000/api"
  },
});
