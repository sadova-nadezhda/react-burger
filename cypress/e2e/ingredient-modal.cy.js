import { SELECTORS } from '../../src/utils/constants';

describe('Ingredient modal', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open modal', () => {
    cy.get(SELECTORS.ingredient).first().as('firstIngredient');
    cy.get('@firstIngredient').click();
    cy.get(SELECTORS.modal).should('exist');
  });

  it('should close modal on button click', () => {
    cy.get(SELECTORS.ingredient).first().as('firstIngredient');
    cy.get('@firstIngredient').click();
    cy.get(SELECTORS.modalClose).click();
    cy.get(SELECTORS.modal).should('not.exist');
  });

  it('should close modal on overlay click', () => {
    cy.get(SELECTORS.ingredient).first().as('firstIngredient');
    cy.get('@firstIngredient').click();
    cy.get(SELECTORS.modalOverlay).click({ force: true });
    cy.get(SELECTORS.modal).should('not.exist');
  });
});
