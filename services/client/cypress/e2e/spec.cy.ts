import { setupAliases } from '../support/alias';
import { asNone, asUnverified, asVerified } from '../support/login';

beforeEach(() => {
  setupAliases();
});

describe('Validate User States', () => {
  it('No User', () => {
    asNone();
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid=AppBar__CurrentUserButton]').should('not.exist');
  });

  it('Verified', () => {
    asVerified();
    cy.visit('http://localhost:3000/');
    cy.wait('@fetchCurrentUser');
    cy.get('[data-testid=AppBar__CurrentUserButton]').should('exist').click();
    cy.get('[data-testid=AppBar__CurrentUserMenu__PlayerCard]').click();
    cy.get('[data-testid=PlayerCardPopup__Verify]').should('not.exist');
  });

  it('Unverified', () => {
    asUnverified();
    cy.visit('http://localhost:3000/');
    cy.wait('@fetchCurrentUser');
    cy.get('[data-testid=AppBar__CurrentUserButton]').should('exist').click();
    cy.get('[data-testid=AppBar__CurrentUserMenu__PlayerCard]').click();
    cy.get('[data-testid=PlayerCardPopup__Verify]').should('exist');
  });
});
