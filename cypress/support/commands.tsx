// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', () => {
  const EMAIL = 'cypress@gamerone.gg';
  const PASSWORD = 'ZEwB!C4sq@zkkhE77beFCpiBUT';
  cy.request({
    method: 'POST',
    url: 'https://api-stage.gamerone.gg/login',
    body: {
      email: EMAIL,
      password: PASSWORD,
    },
  }).then((res) => {
    window.localStorage.setItem('id_token', res.body.token);
  });
});

Cypress.Commands.add('loginAs', (email, password) => {
  cy.request({
    method: 'POST',
    url: 'https://api-stage.gamerone.gg/login',
    body: {
      email: email,
      password: password,
    },
  }).then((res) => {
    window.localStorage.setItem('id_token', res.body.token);
  });
});

Cypress.Commands.add('waitForSpinner', () => {
  cy.get('#spinner').should('not.exist');
});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
