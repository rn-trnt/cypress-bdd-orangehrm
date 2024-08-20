import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import "cypress-mochawesome-reporter/cucumberSupport";

Given("the user is successfully login and on the Buzz Page", () => {
  cy.login();
  cy.moveToPage("Buzz");
  cy.intercept("GET", "**/api/v2/buzz/feed?**").as("getPosts");
  cy.wait("@getPosts");
});

When("the user sorts Buzz by {string}", (sort) => {
  switch (sort) {
    case "Most Commented Posts":
      cy.contains("button.orangehrm-post-filters-button", sort).click();
      break;
    case "Most Liked Posts":
      cy.contains("button.orangehrm-post-filters-button", sort).click();
      break;
    case "Most Recent Posts":
      cy.contains("button.orangehrm-post-filters-button", sort).click();
      break;
  }
});

Then("the updates should be displayed in order of {string} first", (sort) => {
  if (sort !== "Most Recent Posts") {
    cy.wait("@getPosts");
  }

  cy.scrollTo("bottom", { duration: 1000 });
  cy.get("#oxd-toaster_1").scrollIntoView({ duration: 1000, force: true });
});

When("the user create Post with {string}", (text) => {
  cy.get("textarea.oxd-buzz-post-input").clear().type(text);
});

When("click the Post button", () => {
  cy.get(".oxd-button--main").click();
});

Then("the post should be posted successfully", () => {
  cy.wait("@getPosts");
});

Then("the post with {string} should be visible on the Buzz Page", (text) => {
  cy.contains(".orangehrm-buzz", text);
});

When("the user create Post with Photo by clicking Share Photos button", () => {
  cy.contains(".oxd-glass-button", "Share Photos").click();
});

When("the user write a {string}", (caption) => {
  cy.get(
    ".orangehrm-buzz-post-modal-header-text > .oxd-buzz-post > .oxd-buzz-post-input"
  )
    .clear()
    .type(caption);
});

When("the user upload a {string}", (action) => {
  switch (action) {
    case "Single Photo":
      cy.uploadPhoto("catto-1.jpg");
      break;
    case "Multiple Photos":
      cy.uploadPhoto("catto-1.jpg");
      cy.uploadPhoto("catto-2.jpg");
      break;
    case "Photo with Unsupported Format":
      cy.uploadPhoto("catto-3.mp4");
      break;
  }
});

Then("click the share button if {string} is successful", (action) => {
  if (action !== "Photo with Unsupported Format") {
    cy.get(".oxd-form-actions > .oxd-button").click();
  } else {
    cy.get(".oxd-form-actions > .oxd-button").should("have.attr", "disabled");
  }
});

Then(
  "the user will see response for uploading {string} with caption {string} on the Buzz Page",
  (action, caption) => {
    if (action !== "Photo with Unsupported Format") {
      cy.wait("@getPosts");

      cy.contains(".orangehrm-buzz", caption)
        .find(".orangehrm-buzz-post-body-picture")
        .should("be.visible");
    } else {
      cy.get(".oxd-alert").should("be.visible");
    }
  }
);

When(
  "the user writes {string} in the comment field for each post",
  (comment) => {
    cy.intercept(
      "GET",
      "**/api/v2/buzz/shares/**/comments?limit=4&model=detailed"
    ).as("waitComments");

    cy.hasVisiblePosts().then((hasPosts) => {
      if (hasPosts) {
        cy.get(".orangehrm-buzz").each(($post) => {
          cy.get($post)
            .find(".orangehrm-buzz-post-actions button")
            .first()
            .click();

          cy.get($post)
            .find(".orangehrm-buzz-comment-add input")
            .clear()
            .type(`${comment}{enter}`);

          cy.wait("@waitComments");
        });
      } else {
        cy.log("No posts available");
      }
    });
  }
);

Then("each post should display the comment", () => {
  cy.hasVisiblePosts().then((hasPosts) => {
    if (hasPosts) {
      cy.get(".orangehrm-buzz").each(($post) => {
        cy.get($post).find(".orangehrm-comment-wrapper").should("be.visible");
      });
    } else {
      cy.log("No posts available");
    }
  });
});

When("the user likes every visible posts", () => {
  cy.intercept("POST", "**/api/v2/buzz/shares/**/likes").as("waitLikes");

  cy.hasVisiblePosts().then((hasPosts) => {
    if (hasPosts) {
      cy.get(".orangehrm-buzz-post-actions > div").each(($el) => {
        const hasLikeAnimation = $el.hasClass("orangehrm-like-animation");

        if (!hasLikeAnimation) {
          cy.wrap($el).click().wait("@waitLikes");
        }
      });
    } else {
      cy.log("No posts available");
    }
  });
});

Then("each post should show that it has been liked by the user", () => {
  cy.hasVisiblePosts().then((hasPosts) => {
    if (hasPosts) {
      cy.get(".orangehrm-buzz-post-actions > div").each(($like) => {
        cy.wrap($like).should("have.class", "orangehrm-like-animation");
      });
    } else {
      cy.log("No posts available");
    }
  });
});

When("the user deletes all visible posts", () => {
  cy.intercept("DELETE", "**/api/v2/buzz/shares/**").as("waitDelete");

  function deleteVisiblePost() {
    cy.hasVisiblePosts().then((hasPosts) => {
      if (hasPosts) {
        cy.get(".orangehrm-buzz-post-header").then(($post) => {
          if ($post.length > 0) {
            cy.wrap($post.eq(0)).find("button").click();

            cy.wrap($post.eq(0))
              .find(".orangehrm-buzz-post-header-config-item")
              .first()
              .click();

            cy.get(".orangehrm-dialog-popup")
              .should("be.visible")
              .find("button")
              .last()
              .click();

            cy.wait("@waitDelete");
            cy.wait(1000);
            deleteVisiblePost();
          }
        });
      } else {
        cy.log("All visible posts have been deleted");
      }
    });
  }

  cy.hasVisiblePosts().then((hasPosts) => {
    if (hasPosts) {
      deleteVisiblePost();
    } else {
      cy.log("No posts available");
    }
  });
});

Then("no posts should be visible on the Buzz Page", () => {
  cy.get(".orangehrm-buzz-newsfeed-noposts").should("be.visible");
});
