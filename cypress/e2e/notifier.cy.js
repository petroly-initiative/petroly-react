context("Radar service tests", () => {
  // describe("signed-out user to view courses", () => {
  // it("visits the page and views courses and blocks tracking or the tracking canvas", () => {
  //   // intercepting intitial requests
  //   cy.interceptGql("Terms", "notifier/termsList.json");
  //   cy.interceptGql("getDepartments", "notifier/departmentList.json");
  //   // intercepting the search fetch requests
  //   cy.interceptGql("Search", "notifier/sectionsList.json");

  //   cy.visit("/Notifier", {
  //     onBeforeLoad: (win) => {
  //       win.sessionStorage.clear();
  //       win.localStorage.clear();
  //     },
  //   });

  //   cy.wait(["@gqlTermsQuery", "@gqlgetDepartmentsQuery"]);
  //   // empty landing page checks
  //   cy.contains("How to track your courses");
  //   cy.contains("Search");
  //   cy.contains("Select");
  //   cy.contains("Wait");
  //   cy.get("button[id='canvas-btn']").first().click({ force: true });
  //   cy.contains("You need to login to access the tracking list");

  //   cy.get("button[id='search-btn']").first().click();
  //   cy.wait(["@gqlSearchQuery"]);
  //   //  search result checks
  //   cy.contains("ACCT110");
  //   cy.contains("ACFN");
  //   cy.contains("Introduction to Financial Accounting").click();

  //   //   course modal checks
  //   cy.contains("Track a course");
  //   cy.get("div[id='11243-checkbox']").click();
  //   cy.contains("Cancel");
  //   cy.contains("Track Selected").click({ force: true });
  //   cy.contains("You need to login to track courses");
  //   cy.contains("11243").click();
  //   cy.contains("copy course reference number (CRN)");
  // });
  // });

  describe("signed-in user to track and view tracked courses", () => {
    it("visits the page and tracks courses ", () => {
      // intercepting intitial requests
      cy.login();
      cy.interceptGql("Terms", "notifier/termsList.json");
      cy.interceptGql("getDepartments", "notifier/departmentList.json");
      cy.interceptGql("TrackedCourses", "notifier/trackedSections.json");
      cy.interceptGql("TrackingListChannels", "notifier/channels.json");
      // intercepting the search fetch requests
      cy.interceptGql("Search", "notifier/sectionsList.json");

      cy.get('li[id="notifier-btn"]').filter(":visible").first().click();
      cy.wait([
        "@gqlTrackedCoursesQuery",
        "@gqlTrackingListChannelsQuery",
        "@gqlTermsQuery",
        "@gqlgetDepartmentsQuery",
      ]);
      // empty landing page checks
      cy.contains("How to track your courses");
      cy.contains("Search");
      cy.contains("Select");
      cy.contains("Wait");

      cy.get("button[id='search-btn']").first().click();
      cy.wait(["@gqlSearchQuery"]);
      //  search result checks
      cy.contains("ACCT110");
      cy.contains("ACFN");
      cy.contains("Introduction to Financial Accounting").click();
      cy.contains("Track a course");
      cy.get("div[id='11243-checkbox']").click();
      cy.contains("Cancel");
      cy.contains("11243").click();
      cy.contains("copy course reference number (CRN)");
      cy.contains("Cancel").click();
      cy.interceptGql("TrackedCourses", "notifier/trackedSections.json");
      // checking tracked courses
      cy.get("button[id='canvas-btn']").first().click();
      cy.contains("You do not have any tracked courses in this term");
      cy.get("button[data-rr-ui-event-key='202130']").first().click();
      // deleting the course
      cy.contains("ACCT210");
      cy.contains("Lecture");
    });
  });
});
