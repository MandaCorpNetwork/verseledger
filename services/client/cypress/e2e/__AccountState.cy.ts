import { setupAliases } from '../support/alias';
import {
  asNone,
  asUnverified,
  asVerifiedAlpha,
  asVerifiedBravo,
  setupUsers,
} from '../support/login';

beforeEach(() => {
  setupAliases();
  setupUsers();
});

describe('Validate User States', () => {
  it('No User', () => {
    asNone();
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid=AppBar__CurrentUserButton]').should('not.exist');
  });

  it('Unverified', () => {
    asUnverified();
    cy.visit('http://localhost:3000/');
    cy.wait('@fetchCurrentUser');
    cy.get('[data-testid=AppBar__CurrentUserButton]').should('exist').click();
    cy.get('[data-testid=AppBar__CurrentUserMenu__PlayerCard]').click();
    cy.get('[data-testid=PlayerCardPopup__Verify]').should('exist');
    cy.get('[data-testid=PlayerCardPopup__name]').should('contain', 'Unverified User');
  });

  it('Verified Alpha', () => {
    asVerifiedAlpha();
    cy.visit('http://localhost:3000/');
    cy.wait('@fetchCurrentUser');
    cy.get('[data-testid=AppBar__CurrentUserButton]').should('exist').click();
    cy.get('[data-testid=AppBar__CurrentUserMenu__PlayerCard]').click();
    cy.get('[data-testid=PlayerCardPopup__Verify]').should('not.exist');
    cy.get('[data-testid=PlayerCardPopup__name]').should('contain', 'Alpha');
    cy.get('[data-testid=PlayerCardPopup__handle]').should('contain', '@alpha');
  });

  it('Verified Bravo', () => {
    asVerifiedBravo();
    cy.visit('http://localhost:3000/');
    cy.wait('@fetchCurrentUser');
    cy.get('[data-testid=AppBar__CurrentUserButton]').should('exist').click();
    cy.get('[data-testid=AppBar__CurrentUserMenu__PlayerCard]').click();
    cy.get('[data-testid=PlayerCardPopup__Verify]').should('not.exist');
    cy.get('[data-testid=PlayerCardPopup__name]').should('contain', 'Bravo');
    cy.get('[data-testid=PlayerCardPopup__handle]').should('contain', '@bravo');
  });
});
