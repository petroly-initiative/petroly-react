
import { URL_ENDPOINT } from "../../constants";
import { hasOperationName } from "../utils/graphql-test-utils";


// mocking a server-emitted request



context("Instructors Evaluation Test", () => {
 
  // enforcing correct test-timing
  
  describe("Viewing Instructors' list", () => {
    it("displays a single instructor card", () => {
      cy.intercept("POST", URL_ENDPOINT, (req) => {
        if (hasOperationName(req, "Instructors")) {
          req.alias = "gqlInstructorsQuery";
          // data fixture
          req.reply({ fixture: "evaluation/InstructorQuery1.json" });
        }
      });

      cy.intercept("POST", URL_ENDPOINT, (req) => {
        if (hasOperationName(req, "getDepartments")) {
          req.alias = "gqlgetDepartmentsQuery";
          // data fixture
          req.reply({ fixture: "evaluation/deptListQuery.json" });
        }
      });

      

      cy.visit("/instructors", {
        onBeforeLoad: (win) => {
          win.sessionStorage.clear();
          win.localStorage.clear();
        },
      });

      // cy.get('li[id="rating"]').filter(":visible").click();

      cy.wait(["@gqlInstructorsQuery", "@gqlgetDepartmentsQuery"]);

      cy.intercept("POST", URL_ENDPOINT, (req) => {
        if (hasOperationName(req, "Instructors")) {
          req.alias = "gqlInstructorsQuery";
          // data fixture
          req.reply({ fixture: "evaluation/InstructorQuery2.json" });
        }
      });

      cy.contains("Muhab");
      cy.contains(0);
      cy.contains(1)
      cy.contains("Load More").click();
      cy.wait("@gqlInstructorsQuery");
      cy.contains("test3")
      cy.contains("ARE")
      cy.contains("test4");
      cy.contains("COE")

    });
  });
});

// http://localhost:3000/_next/data/lT2vdENBTv9_giiPRud-F/instructors/3.json?instructor=3
