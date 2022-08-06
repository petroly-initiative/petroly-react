// mocking a server-emitted request

context("Instructors Evaluation Test", () => {
  // enforcing correct test-timing


  describe("Viewing Instructors' list", () => {
    it("displays a single instructor card", () => {
      cy.interceptGql("Instructors", "evaluation/InstructorQuery1.json");
      cy.interceptGql("getDepartments", "evaluation/deptListQuery.json");

      cy.visit("/instructors", {
        onBeforeLoad: (win) => {
          win.sessionStorage.clear();
          win.localStorage.clear();
        },
      });

      // cy.get('li[id="rating"]').filter(":visible").click();

      cy.wait(["@gqlInstructorsQuery", "@gqlgetDepartmentsQuery"]);

      cy.contains("Muhab");
      cy.contains(0);
      cy.contains(1);
      cy.contains("Load More").click();
      cy.contains("ammar");
      cy.contains("ICS");
      cy.contains("PHYS");
    });
  });
});

// http://localhost:3000/_next/data/lT2vdENBTv9_giiPRud-F/instructors/3.json?instructor=3
