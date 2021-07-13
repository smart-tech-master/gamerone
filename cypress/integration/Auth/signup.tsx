/// <reference types="cypress" />

context('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('should have field labels', () => {
    cy.get('[for=firstName]').should('have.text', 'First Name');
    cy.get('[for=lastName]').should('have.text', 'Last Name');
    cy.get('[for=email]').should('have.text', 'Email');
    cy.get('[for=username]').should('have.text', 'Username');
    cy.get('[for=password]').should('have.text', 'Password');
  });

  it('should have input and be empty on load', () => {
    cy.get('input[name="firstName"]').should('exist');
    cy.get('input[name="firstName"]').should('be.empty');

    cy.get('input[name="lastName"]').should('exist');
    cy.get('input[name="lastName"]').should('be.empty');

    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="email"]').should('be.empty');

    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="username"]').should('be.empty');

    cy.get('input[name="password"]').should('exist');
    cy.get('input[name="password"]').should('be.empty');
  });

  it('has sign up button', () => {
    cy.get('form').within(() => {
      cy.get('button').should('have.text', 'Sign Up');
    });
  });

  it('sign up button disabled on load', () => {
    cy.get('form').within(() => {
      cy.get('button').contains('Sign Up').should('be.disabled');
    });
  });

  it('first name field validation', () => {
    // required
    cy.get('input[name="firstName"]').focus().blur();
    cy.get('#firstNameError').should('exist');
    cy.get('#firstNameError').should('have.text', 'First name is required');

    // minLength of 2 characters
    cy.get('input[name="firstName"]').focus().type('X').blur();
    cy.get('#firstNameError').should('exist');
    cy.get('#firstNameError').should(
      'have.text',
      'First name must be at least 2 letters long',
    );
  });

  it('last name field validation', () => {
    // required
    cy.get('input[name="lastName"]').focus().blur();
    cy.get('#lastNameError').should('exist');
    cy.get('#lastNameError').should('have.text', 'Last name is required');

    // minLength of 2 characters
    cy.get('input[name="lastName"]').focus().type('X').blur();
    cy.get('#lastNameError').should('exist');
    cy.get('#lastNameError').should(
      'have.text',
      'Last name must be at least 2 letters long',
    );
  });

  it('email field validation', () => {
    // required
    cy.get('input[name="email"]').focus().blur();
    cy.get('#emailError').should('exist');
    cy.get('#emailError').should('have.text', 'Email is required');

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

    // duplicated
    cy.get('input[name="email"]').clear().type('kevin@gamerone.gg').blur();
    cy.get('#uniqueEmailSpinner').should('not.exist');
    cy.get('#emailError').should('exist');
    cy.get('#emailError').should(
      'have.text',
      'This email is already registered',
    );
  });

  it('username field validation', () => {
    // required
    cy.get('input[name="username"]').focus().blur();
    cy.get('#usernameError').should('exist');
    cy.get('#usernameError').should('have.text', 'Username is required');

    // minLength of 3 characters
    cy.get('input[name="username"]').focus().type('X').blur();
    cy.get('#usernameError').should('exist');
    cy.get('#usernameError').should(
      'have.text',
      'Username must be at least 3 letters long',
    );

    // duplicated
    cy.get('input[name="username"]').clear().type('gcg').blur();
    cy.get('#uniqueUsernameSpinner').should('not.exist');
    cy.get('#usernameError').should('exist');
    cy.get('#usernameError').should('have.text', 'This username is duplicated');
  });

  it('password field validation', () => {
    // required
    cy.get('input[name="password"]').focus().blur();
    cy.get('#passwordError').should('exist');
    cy.get('#passwordError').should('have.text', 'Password is required');

    // minLength of 8 characters
    cy.get('input[name="password"]').focus().type('ABC').blur();
    cy.get('#passwordError').should('exist');
    cy.get('#passwordError').should(
      'have.text',
      'Password must be at least 8 characters long',
    );

    // Password must contain at least one uppercase
    cy.get('input[name="password"]').clear().type('cypresstest.123').blur();
    cy.get('#passwordError').should('exist');
    cy.get('#passwordError').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter',
    );

    // Password must contain at least one lowercase
    cy.get('input[name="password"]').clear().type('CYPRESSTEST.123').blur();
    cy.get('#passwordError').should('exist');
    cy.get('#passwordError').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter',
    );

    // Password must contain at least one digit
    cy.get('input[name="password"]').clear().type('CYPRESS.TEST').blur();
    cy.get('#passwordError').should('exist');
    cy.get('#passwordError').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter',
    );

    // Password must contain at least one special character
    cy.get('input[name="password"]').clear().type('CypressTest123').blur();
    cy.get('#passwordError').should('exist');
    cy.get('#passwordError').should(
      'have.text',
      'Password must contain at least one uppercase, one lowercase, one digit and one special letter',
    );
  });

  it('form should be valid', () => {
    cy.get('input[name="firstName"]')
      .type('Cypress')
      .should('have.value', 'Cypress');

    cy.get('input[name="lastName"]').type('Test').should('have.value', 'Test');

    cy.get('input[name="email"]')
      .type('cypress@gamerone.gg')
      .should('have.value', 'cypress@gamerone.gg');

    cy.get('input[name="username"]')
      .type('cypress')
      .should('have.value', 'cypress');

    cy.get('input[name="password"]')
      .type('CypressTest.123')
      .should('have.value', 'CypressTest.123')
      .blur();

    cy.get('form').within(() => {
      cy.get('button').should('be.enabled');
    });
  });
});
