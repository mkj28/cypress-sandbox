/// <reference types="cypress" />

// tests depend on https://github.com/profydev/prolog-app running locally

import mockProjects from "../../fixtures/projects.json";
import capitalize from "lodash/capitalize";



context('Project List', () => {


    beforeEach(() => {
        // setup request mock
        cy.intercept("GET", "https://prolog-api.profy.dev/project", {
            fixture: "projects.json",
        }).as("getProjects");


        cy.viewport(1024, 768) // minimum width to see the navbar
        cy.visit("http://localhost:3000/dashboard");

        // wait for the projects response
        cy.wait("@getProjects");
    });

    describe("Launching with wide enough viewport", () => {

        it("renders the projects", () => {

            // get all project cards
            cy.get("main")
                .find("li").each(($el, index) => {
                    // check that project data is rendered
                    cy.wrap($el).contains(mockProjects[index].name);
                    cy.wrap($el).contains(mockProjects[index].numIssues);
                    cy.wrap($el).contains(mockProjects[index].numEvents24h);
                    cy.wrap($el).contains(capitalize(mockProjects[index].status));
                    cy.wrap($el).find("a").should("have.attr", "href", "/dashboard/issues");
                  });
        });


    });
})