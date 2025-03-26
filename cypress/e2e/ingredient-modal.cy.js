describe('Ingredient modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should open modal', () => {
    cy.get('[data-test="ingredient"]').first().click();
    cy.get('[data-test="modal"]').should('exist');
  });

  it('should close modal on button click', () => {
    cy.get('[data-test="ingredient"]').first().click();
    cy.get('[data-test="modal-close"]').click();
    cy.get('[data-test="modal"]').should('not.exist');
  });

  it('should close modal on overlay click', () => {
    cy.get('[data-test="ingredient"]').first().click();
    cy.get('[data-test="modal-overlay"]').click({ force: true });
    cy.get('[data-test="modal"]').should('not.exist');
  });
});
