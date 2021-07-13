/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Login as the default Cypress automated test user.
     */
    login(): Chainable<any>;

    /**
     * Login to the application using the provided email and password.
     *
     * @param email - email adress
     * @param password - password for the account
     */
    loginAs(email: string, password: string): Chainable<any>;
  }
}
