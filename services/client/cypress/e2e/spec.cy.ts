describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    const homeButton = cy.get('[data-testid="HomeNavButton__/contract/splash"]');
    cy.wait(100);
    homeButton.click();
  });
});
