/// <reference types="cypress" />

// tests depend on https://github.com/profydev/prolog-app running locally

context('Navigation', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/dashboard");
    });

    describe("Launching with wide enough viewport", () => {
        beforeEach(() => {
            cy.viewport(1024, 768) // minimum width to see the navbar
        });

        it("displays navbar expanded", () => {
            cy.get("nav").should('have.length', 1);
            cy.get('nav').should('be.visible');
            cy.get("nav").find("a").should("have.length", 5);
        });


        it("links are working", () => {
            // check that issues link leads to the right page
            cy.get("nav").contains("Issues").click();
            cy.url().should("eq", "http://localhost:3000/dashboard/issues");
        });

        it("is collapsible", () => {
            // collapse navigation
            cy.get("nav").contains("Collapse").click();
            cy.get("nav").contains("Collapse").should('not.exist') // not.exist vs not.be.visible
            cy.get("nav").should('not.contain', 'Collapse') // alternative to check if element is not there
        });
    });

    describe("With narrower viewport", () => {
        beforeEach(() => {
            cy.viewport(1023, 768); //navbar not shown at this width
        })

        it("has navbar hidden", () => {
            cy.get('nav').should('not.be.visible')
        })

        describe("Clicking the hamburger menu", () => {
            beforeEach(() => {
                cy.get('[alt="open menu"]').click()
            })

            it("expands the navbar", () => {
                cy.get("nav").should('have.length', 1);
                cy.get('nav').should('be.visible');
            });
        })
    })
})