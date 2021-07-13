/// <reference types="cypress" />

context('Navigation - Public', () => {
  beforeEach(() => {
    cy.visit('/');
    localStorage.clear();
  });

  it('has site title Gamer One', () => {
    cy.title().should('eq', 'Gamer One');
  });
});
