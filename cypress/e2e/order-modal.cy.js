import { SELECTORS } from '../../src/utils/constants';

describe('Order modal', () => {
  beforeEach(() => {
    cy.loginAndVisit();
  });

  it('should open order modal on successful order', () => {
    cy.dragToConstructor('булка');
    cy.dragToConstructor('Соус');

    cy.get(SELECTORS.orderButton).click();
    cy.get(SELECTORS.modal).should('exist');
  });
});


// describe('Order modal', () => {
//   beforeEach(() => {
//     cy.mockApi();
//     cy.visit('http://localhost:5173/');
//   });

//   const addIngredients = () => {
//     cy.get('[data-test="ingredient"]').contains('булка').trigger('dragstart');
//     cy.get('[data-test="constructor"]').trigger('drop');
//     cy.get('[data-test="ingredient"]').contains('Соус').trigger('dragstart');
//     cy.get('[data-test="constructor"]').trigger('drop');
//   };

//   context('When user is not authenticated', () => {
//     it('should redirect to login page', () => {
//       addIngredients();
//       cy.get('[data-test="order-button"]').click();
//       cy.url().should('include', '/login');
//     });
//   });

//   context('When user is authenticated', () => {
//     beforeEach(() => {
//       cy.setCookie('accessToken', 'mockedAccessToken');
//       cy.visit('http://localhost:5173/');
//     });

//     it('should open order modal on successful order', () => {
//       addIngredients();
//       cy.get('[data-test="order-button"]').click();
//       cy.wait('@postOrder').its('response.statusCode').should('eq', 200);
//       cy.get('[data-test="modal"]').should('exist');
//     });
//   });
// });