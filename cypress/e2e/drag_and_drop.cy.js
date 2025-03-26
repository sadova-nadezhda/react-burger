describe('Drag ingredients to constructor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should drag bun', () => {
    cy.get('[data-test="ingredient"]').contains('булка').trigger('dragstart');
    cy.get('[data-test="constructor"]').trigger('drop');
    cy.get('[data-test="constructor-bun"]').should('exist');
  });

  it('should drag ingredient', () => {
    cy.get('[data-test="ingredient"]').contains('Соус').trigger('dragstart');
    cy.get('[data-test="constructor"]').trigger('drop');
    cy.get('[data-test="constructor-item"]').should('exist');
  });
});