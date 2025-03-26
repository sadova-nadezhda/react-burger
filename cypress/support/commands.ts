/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: 'https://norma.nomoreparties.space/api/auth/login',
    body: {
      email: 'n.sadova98@gmail.com',
      password: 'password2',
    },
  }).then(({ body }) => {
    const token = body.accessToken.replace('Bearer ', '');
    window.localStorage.setItem('accessToken', token);
    window.localStorage.setItem('refreshToken', body.refreshToken);
    Cypress.env('authHeader', token);
  });
});

Cypress.Commands.add('refreshToken', () => {
  cy.request({
    method: 'POST',
    url: 'https://norma.nomoreparties.space/api/auth/token',
    body: { token: localStorage.getItem('refreshToken') },
  }).then(({ body }) => {
    const token = body.accessToken.replace('Bearer ', '');
    localStorage.setItem('accessToken', token);
    Cypress.env('authHeader', token);
  });
});

// Cypress.Commands.add('mockApi', () => {
//   cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
//   cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
//   cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('postOrder');
// });
