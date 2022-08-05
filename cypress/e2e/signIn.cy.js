import {

  hasOperationName,
} from "../utils/graphql-test-utils";
import { URL_ENDPOINT } from "../../constants";




context("Login Tests", () => {
  

  describe("Login Display scenarios" + URL_ENDPOINT, () => {
    it("error on empty input", () => {
      cy.visit("/", {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      },
    });
      cy.contains("Our Services");

      cy.get('button[id="sign-in"]').filter(":visible").click();

      cy.get('button[id="submit-btn"]').click();
      cy.contains("Please");
    });

    it("successful input", () => {
      const URL = URL_ENDPOINT;

     

      // intercepting 3 diferent graphQL server queries for verification
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

      cy.intercept("POST", URL, (req) => {
        if (hasOperationName(req, "VerifyToken")) {
          req.alias = "gqlVerifyTokenMutation";
          // data fixture
          req.reply({ fixture: "signinData/VerifyTokenQuery.json" });
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
      cy.get('input[id="username-input"]').type("admin", {force: true});
      cy.get('input[id="pass-input"]').type("aassddff", {force: true});
      cy.get('button[id="submit-btn"]').click();

      cy.wait(["@gqlVerifyTokenMutation", "@gqlMeQuery", "@gqlgetTokenQuery"]);

      cy.wait(3000)
      cy.get('button[id="profile-btn"]').filter(":visible").first().click();
      cy.contains("tested-admin");
      cy.contains("chicken@gmail.com");
    });
  });
});