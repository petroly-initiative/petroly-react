import { aliasMutation, aliasQuery, hasOperationName } from "../utils/graphql-test-utils";

context("Tests", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:8000/endpoint/", (req) => {
      aliasQuery(req, "getToken");
      aliasQuery(req, "Me");
      aliasMutation(req, "VerifyToken");

      if (hasOperationName(req, "Refresh")) {
        req.alias = "gqlRefreshMutation";
        // data fixture
        req.reply({ fixture: "RefreshQuery.json" });
      }
    });
  });
});

describe("Login Display scenarios", () => {
  it("error on empty input", () => {
    cy.visit("/", {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
      },
    });

    cy.contains("Our Services");

    cy.get('button[id="sign-in"]').filter(":visible").click();

    cy.get('button[id="submit-btn"]').click();
    cy.contains("Please");
  });

  // it("successful input", () => {
  //   const URL = "http://localhost:8000/endpoint/";
  //   cy.visit("/", {
  //     onBeforeLoad: (win) => {
  //       win.sessionStorage.clear();
  //     },
  //   });

  //   cy.contains("Our Services");

  //   cy.get('button[id="sign-in"]').filter(":visible").click();

  //   // dummy user
  //   cy.get('input[id="username-input"]').type("admin");
  //   cy.get('input[id="pass-input"]').type("aassddff");
  //   cy.get('button[id="submit-btn"]').click();

  //   // intercepting 3 diferent graphQL server queries for verification
  //   cy.intercept("POST", URL, (req) => {
  //     if (hasOperationName(req, "getToken")) {
  //     req.alias = "gqlgetTokenQuery";
  //     // data fixture
  //     req.reply({ fixture: "getTokenQuery.json" });
  //     }
  //   });

    

  //   cy.intercept("POST", URL, (req) => {
  //     if (hasOperationName(req, "Me")) {
  //     req.alias = "gqlMeQuery";
  //     // data fixture
  //     req.reply({ fixture: "MeQuery.json" });
  //     }
  //   });



  //   cy.intercept("POST", URL, (req) => {
  //     if (hasOperationName(req, "VerifyToken")) {
  //     req.alias = "gqlVerifyTokenMutation";
  //     // data fixture
  //     req.reply({
  //       data: {
  //         verifyToken: {
  //           success: true,
  //           errors: null,
  //           payload: {
  //             username: "admin",
  //             exp: 1654712024,
  //             origIat: 1654625624,
  //           },
  //           __typename: "VerifyToken",
  //         },
  //       },
  //     });
  //   }
  //   });

  //   cy.wait(["@gqlVerifyTokenMutation", "@gqlMeQuery", "@gqlgetTokenQuery"]);

  //   cy.get('button[id="profile-btn"]').filter(":visible").first().click();
  //   cy.contains("tested-admin");
  //   cy.contains("chicken@gmail.com");
  // });
});
