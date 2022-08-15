context("Dashboard test ", () => {
  describe("displays a basic dashboad", () => {
    it("open the dashboard successfully", () => {
      cy.login();

      cy.interceptGql("Me", "signinData/MeQuery.json");
      cy.interceptGql("MyEvaluations", "dashboard/evalsQuery.json");
      cy.interceptGql("MyCommunities", "dashboard/communitiesQuery.json");

      cy.interceptGql("getCommunityInfo", "dashboard/commInfoQuery.json");

      // custom login mock command
      cy.get('button[id="profile-btn"]').filter(":visible").first().click();
      cy.contains("Dashboard").click();
      // wow
      cy.wait(3000);
      cy.wait([
        "@gqlMyEvaluationsQuery",
        "@gqlMeQuery",
        "@gqlMyCommunitiesQuery",
        "@gqlgetCommunityInfoQuery",
      ]);

      cy.contains("tested-admin");
      cy.contains("1");
      cy.contains("2");
      cy.contains("Dashboard");
      cy.contains("xxxx");
      //   cy.contains("hi");
    });
  });
});
