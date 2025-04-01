import { SELECTORS } from '../../src/utils/constants';

describe('Drag ingredients to constructor', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should drag bun', () => {
    cy.dragToConstructor('булка');
    cy.get(SELECTORS.constructorBun).should('exist');
  });

  it('should drag ingredient', () => {
    cy.dragToConstructor('Соус');
    cy.get(SELECTORS.constructorItem).should('exist');
  });
});
