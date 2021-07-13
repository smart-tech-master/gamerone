/// <reference types="cypress" />

context('Password Reset', () => {
  beforeEach(() => {
    cy.visit('/account/password-reset');
  });

  it('should have field labels', () => {
    cy.get('[for=email]').should('have.text', 'Email');
  });

  it('should have input and be empty on load', () => {
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="email"]').should('be.empty');
  });

  it('has reset button', () => {
    cy.get('form').within(() => {
      cy.get('button').should('have.text', 'Reset');
    });
  });

  it('reset button disabled on load', () => {
    cy.get('form').within(() => {
      cy.get('button').contains('Reset').should('be.disabled');
    });
  });

  it('email field validation', () => {
    // correct email format
    cy.get('input[name="email"]').focus().type('cypress').blur();
    cy.get('#emailError').should('exist');
    cy.get('#emailError').should(
      'have.text',
      'This is not correct email format',
    );

    cy.get('input[name="email"]').focus().type('cypress@gamerone').blur();
    cy.get('#emailError').should('exist');
    cy.get('#emailError').should(
      'have.text',
      'This is not correct email format',
    );
  });

  it('form should be valid but not find email', () => {
    cy.get('input[name="email"]')
      .type('cypress-not-found@gamerone.gg')
      .should('have.value', 'cypress-not-found@gamerone.gg')
      .blur();

    cy.get('form').within(() => {
      cy.get('button').should('be.enabled');
      cy.get('button').click();
    });

    cy.get('#formError').should('have.text', 'Not Found');
  });

  it('form should be valid and send email', () => {
    cy.get('input[name="email"]')
      .type('cypress@gamerone.gg')
      .should('have.value', 'cypress@gamerone.gg')
      .blur();

    cy.get('form').within(() => {
      cy.get('button').should('be.enabled');
      cy.get('button').click();
    });

    cy.get('#formError').should(
      'have.text',
      'Password reset email is sent to this address',
    );
  });
});
