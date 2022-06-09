import { URL_ENDPOINT } from "../../constants";
import { hasOperationName } from "../utils/graphql-test-utils";

// enforcing correct test-timing

context("Instructors Evaluation Test", () => {
  describe("Viewing Instructors' list", () => {
    it("displays a single instructor card", () => {
      cy.intercept("POST", URL_ENDPOINT, (req) => {
        if (hasOperationName(req, "Instructors")) {
          req.alias = "gqlInstructorsQuery";
          // data fixture
          req.reply({ fixture: "evaluation/InstructorQuery.json" });
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

      cy.contains("Muhab")
    });
  });

  // describe("Viewing Instructors' details", () => {
  //   it(" checks its contents", () => {
  //     cy.reload(true);
  //     cy.intercept("GET", "http://localhost:3000/instructors/1", (req) => {
  //       req.alias = "gqlInstructorQuery";

  //       req.reply({
  //         fixture: "evaluation/InstructorDetailQuery.html",
  //       });
  //     });

  //     cy.visit("http://localhost:3000/instructors/1");

  //     cy.wait("@gqlInstructorQuery");
  //     cy.contains("ammar");
  //     cy.contains("PHYS");
  //     cy.contains("0.0");
  //     cy.contains("5");
  //   });
  // });
});

// http://localhost:3000/_next/data/lT2vdENBTv9_giiPRud-F/instructors/3.json?instructor=3
