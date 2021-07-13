/// <reference types="cypress" />

context('Password Reset - New', () => {
  beforeEach(() => {
    cy.visit('/account/password-reset-new');
  });

  it('should have field labels', () => {
    cy.get('[for=password]').should('have.text', 'New Password');
    cy.get('[for=confirmPassword]').should('have.text', 'Confirm Password');
  });

  it('should have inputs and be empty on load', () => {
    cy.get('input[name="password"]').should('exist');
    cy.get('input[name="password"]').should('be.empty');

    cy.get('input[name="confirmPassword"]').should('exist');
    cy.get('input[name="confirmPassword"]').should('be.empty');
  });

  it('has set new button', () => {
    cy.get('form').within(() => {
      cy.get('button').should('have.text', 'Set new password');
    });
  });

  it('set new button disabled on load', () => {
    cy.get('form').within(() => {
      cy.get('button').contains('Set new password').should('be.disabled');
    });
  });

  it('password field required', () => {
    cy.get('input[name="password"]').focus().blur();
    cy.get('#passwordError').should('exist');
    cy.get('#passwordError').should('have.text', 'Password is required');
  });

  it('password field minLength of 8', () => {
    cy.get('input[name="password"]').focus().type('ABC').blur();
    cy.get('#passwordError').should('exist');
    cy.get('#passwordError').should(
      'have.text',
      'Password must be at least 8 characters long',
    );
  });

  it('password field contain at least one uppercase', () => {
    cy.get('input[name="password"]').clear().type('cypresstest.123').blur();
    cy.get('#passwordError').should('exist');
    cy.get('#passwordError').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter',
    );
  });

  it('password field contain at least one lowercase', () => {
    cy.get('input[name="password"]').clear().type('CYPRESSTEST.123').blur();
    cy.get('#passwordError').should('exist');
    cy.get('#passwordError').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter',
    );
  });

  it('password field contain at least one digit', () => {
    cy.get('input[name="password"]').clear().type('CYPRESS.TEST').blur();
    cy.get('#passwordError').should('exist');
    cy.get('#passwordError').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter',
    );
  });

  it('password field contain at least one special character', () => {
    cy.get('input[name="password"]').clear().type('CypressTest123').blur();
    cy.get('#passwordError').should('exist');
    cy.get('#passwordError').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter',
    );
  });

  // Confirm Password

  it('confirm password does not match password', () => {
    cy.get('input[name="password"]').clear().type('CypressTest.123');
    cy.get('input[name="confirmPassword"]')
      .clear()
      .type('cypresstest.123')
      .blur();

    cy.get('#confirmPasswordError').should('exist');
    cy.get('#confirmPasswordError').should(
      'have.text',
      'Passwords do not match',
    );
  });
});
