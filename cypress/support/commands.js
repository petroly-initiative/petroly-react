// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import { hasOperationName, TEST_ENDPOINT } from "../utils/graphql-test-utils";

var endpoint;
  endpoint =TEST_ENDPOINT();
  
  Cypress.Commands.add("login", () => {
    URL = endpoint;
    cy.intercept("POST", URL, (req) => {
      if (hasOperationName(req, "getToken")) {
        req.alias = "gqlgetTokenQuery";
        // data fixture
        req.reply({ fixture: "signinData/getTokenQuery.json" });
      }
    });

    cy.intercept("POST", URL, (req) => {
      if (hasOperationName(req, "Me")) {
        req.alias = "gqlMeQuery";
        // data fixture
        req.reply({ fixture: "signinData/MeQuery.json" });
      }
    });

    cy.visit("/", {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      },
    });

    cy.contains("Our Services");

    cy.get('button[id="sign-in"]').filter(":visible").click();

    // dummy user
    cy.get('input[id="username-input"]').type("admin", { force: true });
    cy.get('input[id="pass-input"]').type("aassddff", { force: true });
    cy.get('button[id="submit-btn"]').click();
  });

Cypress.Commands.add("interceptGql", ( operationName, fixtureDir) => {
  cy.intercept("POST", endpoint, (req) => {
    if (hasOperationName(req, operationName)) {
      req.alias = `gql${operationName}Query`;
      // data fixture
      req.reply({ fixture: fixtureDir });
    }
  });
});
