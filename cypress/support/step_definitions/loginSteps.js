import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import "cypress-mochawesome-reporter/cucumberSupport";

Given("the user is on the login page", () => {
  cy.visit("https://opensource-demo.orangehrmlive.com/");
});

When("the user enters valid credentials", () => {
  cy.get('input[name="username"]').clear().type("Admin");
  cy.get('input[name="password"]').clear().type("admin123");
});

When("the user enters {string} as the username", (username) => {
  cy.get('input[name="username"]')
    .clear()
    .type(username)
    .should("have.value", username);
});

When("enters {string} as the password", (password) => {
  cy.get('input[name="password"]')
    .clear()
    .type(password)
    .should("have.value", password);
});

When("the user leaves the username and password field blank", () => {
  cy.get('input[name="username"]').clear().should("have.value", "");
  cy.get('input[name="password"]').clear().should("have.value", "");
});

When("clicks the Login button", () => {
  cy.get("button.orangehrm-login-button").click();
});

Then("the user should be redirected to the dashboard", () => {
  cy.url().should("include", "/dashboard/index");
  cy.contains("Dashboard");
});

Then(
  "an {string} should be displayed indicating the username or password is incorrect",
  () => {
    cy.get(".oxd-alert-content--error")
      .should("be.visible")
      .find("p")
      .should("contain", "Invalid credentials");
  }
);

Then(
  'the username and password fields become active, displaying the text "Required"',
  () => {
    cy.get('input[name="username"]')
      .should("have.value", "")
      .and("have.class", "oxd-input--error");

    cy.get('input[name="password"]')
      .should("have.value", "")
      .and("have.class", "oxd-input--error");

    cy.get(".oxd-input-field-error-message")
      .should("be.visible")
      .and("have.length", 2)
      .and("contain", "Required");
  }
);
