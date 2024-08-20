/// <reference types="cypress" />

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", () => {
  cy.session("login", () => {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
    cy.get('input[name="username"]').clear().type("Admin");
    cy.get('input[name="password"]').clear().type("admin123");
    cy.get("button.orangehrm-login-button").click();
    cy.url().should("include", "/dashboard/index");
    cy.contains("Dashboard");
  });
});

Cypress.Commands.add("moveToPage", (page) => {
  cy.visit("https://opensource-demo.orangehrmlive.com/");
  cy.contains("li.oxd-main-menu-item-wrapper", page).click();
  cy.contains("li.oxd-main-menu-item-wrapper", page)
    .find("a")
    .should("have.class", "active");
});

Cypress.Commands.add("searchBy", (type, element) => {
  cy.get(".oxd-table-body").then(($table) => {
    const rows = $table.find(".oxd-table-card > .oxd-table-row");

    if (rows.length === 0) {
      cy.log(`No ${type} is found`);
    } else {
      cy.get(`.oxd-table-card > .oxd-table-row > :nth-child(${element})`).each(
        ($cell) => {
          expect($cell).to.have.text(type);
        }
      );
    }
  });
});

Cypress.Commands.add("uploadPhoto", (fileName) => {
  cy.get('input[type="file"]').selectFile([`cypress/fixtures/${fileName}`], {
    force: true,
  });
});

Cypress.Commands.add("hasVisiblePosts", () => {
  return cy.get(".orangehrm-buzz-newsfeed-noposts").then(($el) => {
    if ($el.is(":visible")) {
      return false;
    } else {
      return true;
    }
  });
});
