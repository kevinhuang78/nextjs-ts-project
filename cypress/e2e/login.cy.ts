describe("Login", () => {
  beforeEach(() => {
    cy.intercept("GET", `${Cypress.env("wecasa_api_url")}/universes.json`, {
      fixture: "universes.json",
    }).as("getUniverses");
  });

  it("should get redirected to login page if user is not logged in", () => {
    cy.visit("/customer-area/dashboard");

    cy.get("h1").should("contain", "Connexion");
  });

  it("logins correctly", () => {
    cy.visit("/");
    cy.wait(["@getUniverses"]);

    cy.contains("Connexion").click();

    cy.url().should("include", "/login");

    cy.get("input[name=email]").type("kevin@wecasa.fr");
    // {enter} causes the form to submit
    cy.get("input[name=password]").type("123456{enter}");
    cy.intercept("POST", `${Cypress.env("wecasa_api_url")}/session`, {
      fixture: "connected-user.json",
    });

    cy.url().should("include", "/customer-area/dashboard");
    cy.get("h1").should("contain", "This is the dashboard");
  });

  it("unlogs correctly", () => {
    cy.visit("/login");

    cy.contains("Connexion").click();

    cy.get("input[name=email]").type("kevin@wecasa.fr");
    // {enter} causes the form to submit
    cy.get("input[name=password]").type("123456{enter}");
    cy.intercept("POST", `${Cypress.env("wecasa_api_url")}/session`, {
      fixture: "connected-user.json",
    });

    cy.url().should("include", "/customer-area/dashboard");
    cy.get("h1").should("contain", "This is the dashboard");

    cy.contains("Me déconnecter").click();
    cy.get("h1").should("contain", "Les services les plus utilisés :");
  });
});

// So that TS stop complaining
export {};
