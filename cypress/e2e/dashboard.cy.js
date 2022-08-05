import { URL_ENDPOINT } from "../../constants";

context("Dashboard test " + URL_ENDPOINT + process.env.NODE_ENV, () => {
  describe("displays a basic dashboad", () => {
    it("open the dashboard successfully", () => {
      cy.login();

      cy.wait(["@gqlMeQuery", "@gqlgetTokenQuery"]);

      cy.interceptGql(URL_ENDPOINT, "Me", "signinData/MeQuery.json");
      cy.interceptGql(
        URL_ENDPOINT,
        "MyEvaluations",
        "dashboard/evalsQuery.json"
      );
      cy.interceptGql(
        URL_ENDPOINT,
        "MyCommunities",
        "dashboard/communitiesQuery.json"
      );

      cy.interceptGql(
        URL_ENDPOINT,
        "getCommunityInfo",
        "dashboard/commInfoQuery.json"
      );

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
