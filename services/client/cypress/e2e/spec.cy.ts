describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    const homeButton = cy.get('.MuiIconButton-root > img');
    cy.wait(100);
    homeButton.click();
  });
});
