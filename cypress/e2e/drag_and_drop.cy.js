import { SELECTORS } from '../../src/utils/constants';

describe('Drag ingredients to constructor', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should drag bun', () => {
    cy.get(SELECTORS.ingredient).contains('булка').trigger('dragstart');
    cy.get(SELECTORS.constructor).trigger('drop');
    cy.get(SELECTORS.constructorBun).should('exist');
  });

  it('should drag ingredient', () => {
    cy.get(SELECTORS.ingredient).contains('Соус').trigger('dragstart');
    cy.get(SELECTORS.constructor).trigger('drop');
    cy.get(SELECTORS.constructorItem).should('exist');
  });
});
