import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import "cypress-mochawesome-reporter/cucumberSupport";

Given("the user is successfully login and on the Admin Page", () => {
  cy.login();
  cy.moveToPage("Admin");
});

When("the user click on User Role dropdown", () => {
  cy.get(":nth-child(2) > .oxd-input-group").find("i").click();
});

When("the user click on Status dropdown", () => {
  cy.get(":nth-child(4) > .oxd-input-group").find("i").click();
});

When("the user selects the {string} role", (role) => {
  cy.intercept("GET", "**/api/v2/admin/users?**").as("getUsers");
  cy.contains(".oxd-select-option", role).click();
});

When("the user selects the {string}", (status) => {
  cy.intercept("GET", "**/api/v2/admin/users?**").as("getUsers");
  cy.contains(".oxd-select-option", status).click();
});

When("the user click the Search button", () => {
  cy.get(".oxd-form-actions > .oxd-button--secondary").click();
});

Then(
  "the user should be able to search and view results for the {string} role",
  (role) => {
    cy.wait("@getUsers");
    cy.searchBy(role, 3);
  }
);

Then("all user with the {string} status should be displayed", (status) => {
  cy.wait("@getUsers");
  cy.searchBy(status, 5);
});
