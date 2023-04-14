describe("Universes page", () => {
  beforeEach(() => {
    cy.intercept("GET", `${Cypress.env("wecasa_api_url")}/universes.json`, {
      fixture: "universes.json",
    }).as("getUniverses");
  });

  it("should visit and render homepage correctly", () => {
    cy.visit("/");

    cy.get("h1").should("contain", "Les services les plus utilisés :");
  });

  it("get redirected when clicking on the navbar", () => {
    cy.visit("/");

    cy.contains("Beauté").click();

    cy.url().should("include", "/universe/beauty");
  });

  [
    {
      reference: "beauty",
      title: "Beauté",
      randomService: "Jambes + Maillot + Aisselles",
    },
    { reference: "haircut", title: "Coiffure", randomService: "Shampoing" },
    {
      reference: "massage",
      title: "Massage",
      randomService: "Massage deep tissue",
    },
    { reference: "cleaning", title: "Ménage", randomService: "Ménage" },
    {
      reference: "childcare",
      title: "Garde d'enfants",
      randomService: "Garde d'enfants (journée)",
    },
    {
      reference: "sports_coaching",
      title: "Coach sportif",
      randomService: "Cours de stretching",
    },
  ].forEach(({ reference, title, randomService }) => {
    it(`renders ${title} universe page correctly`, () => {
      cy.visit(`/universe/${reference}`);

      cy.get("h1").contains(title);
      cy.contains("Nous proposons ces services :");
      cy.contains(randomService);
      cy.contains("Nous travaillons actuellement dans ces départements :");
      cy.contains("75");
    });
  });

  [
    {
      error: "server error",
      response: { statusCode: 500 },
      expected: "AxiosError: Request failed with status code 500",
    },
    {
      error: "network failure",
      response: { forceNetworkError: true },
      expected: "AxiosError: Network Error",
    },
  ].forEach(({ error, response, expected }) => {
    it.skip(`renders error correctly when having a ${error}`, () => {
      cy.intercept(
        "GET",
        `${Cypress.env("wecasa_api_url")}/universes.json`,
        response
      ).as("getUniverses");
      cy.visit("/universe/haircut");
      cy.wait(["@getUniverses"]);

      cy.contains(expected);
    });
  });
});

// So that TS stop complaining
export {};
