import { URL_ENDPOINT } from "../../constants";

context("group service tests", () => {
  describe("visit the groups service successfully", () => {
    it("visits thw whole page and displays a dialog details", () => {
      cy.login();
      cy.interceptGql(
        URL_ENDPOINT,
        "Communities",
        "groups/getCommunities.json"
      );
      cy.interceptGql(
        URL_ENDPOINT,
        "InteractedCommunity",
        "groups/likedCommunityMutation.json"
      );
      cy.interceptGql(
        URL_ENDPOINT,
        "InteractedCommunity",
        "groups/likedCommunityMutation.json"
      );
      cy.get('li[id="groups-btn"]').filter(":visible").first().click();
      cy.wait(3000)
      cy.wait[
        ("@gqlCommunitiesQuery",
        "@gqlInteractedCommunity.json",
        "@gqlInteractedCommunity.json")
      ];

      cy.contains("20");
      cy.contains("15");
      cy.contains("shady stuff");
      cy.contains("petroly tests").click();
      cy.contains("WE just play don't study");
      cy.contains("Join Group");
      cy.contains("Description");
      cy.contains("Platform");
    });
  });
});
