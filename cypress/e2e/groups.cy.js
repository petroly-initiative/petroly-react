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
    });
  });
});
