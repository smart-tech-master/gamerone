/// <reference types="cypress" />

context('Log In', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should have field labels', () => {
    cy.get('[for=email]').should('have.text', 'Email');
    cy.get('[for=password]').should('have.text', 'Password');
  });

  it('should have input and be empty on load', () => {
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="email"]').should('be.empty');

    cy.get('input[name="password"]').should('exist');
    cy.get('input[name="password"]').should('be.empty');
  });

  it('has log in button', () => {
    cy.get('form').within(() => {
      cy.get('button').should('have.text', 'Log In');
    });
  });

  it('form should be valid but fail login', () => {
    cy.get('input[name="email"]')
      .type('cypress-not-found@gamerone.gg')
      .should('have.value', 'cypress-not-found@gamerone.gg');

    cy.get('input[name="password"]')
      .type('Cypress.Test123')
      .should('have.value', 'Cypress.Test123')
      .blur();

    cy.get('form').within(() => {
      cy.get('button').should('be.enabled');
      cy.get('button').click();
    });

    cy.waitForSpinner();
    cy.get('#formError').should(
      'have.text',
      'Email or passsword is not correct',
    );
  });

  it('form should be valid and login', () => {
    cy.get('input[name="email"]')
      .type('cypress@gamerone.gg')
      .should('have.value', 'cypress@gamerone.gg');

    cy.get('input[name="password"]')
      .type('ZEwB!C4sq@zkkhE77beFCpiBUT')
      .should('have.value', 'ZEwB!C4sq@zkkhE77beFCpiBUT')
      .blur();

    cy.get('form').within(() => {
      cy.get('button').should('be.enabled');
      cy.get('button')
        .click()
        .should(() => {
          expect(localStorage.getItem('id_token')).to.exist;
        });
    });
  });
});
