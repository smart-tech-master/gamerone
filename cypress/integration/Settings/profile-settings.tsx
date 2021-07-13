/// <reference types="cypress" />
/// <reference types="../../support" />

context('Settings - Profile', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/settings/profile');
  });

  it('should have field labels', () => {
    cy.get('[for=username]').should('have.text', 'Username');
    cy.get('[for=email]').should('have.text', 'Email');
    cy.get('[for=firstName]').should('have.text', 'First Name');
    cy.get('[for=lastName]').should('have.text', 'Last Name');
    cy.get('[for=bio]').should('have.text', 'Bio');
    cy.get('[for=birthDate]').should('have.text', 'Birth Date');
    cy.get('[for=location]').should('have.text', 'Location');
  });

  // it('should be pre-populated on load', () => {});
});
