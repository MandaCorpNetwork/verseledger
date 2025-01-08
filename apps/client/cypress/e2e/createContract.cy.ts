import { setupAliases } from '../support/alias';
import { asVerifiedAlpha, setupUsers } from '../support/login';

beforeEach(() => {
  setupAliases();
  setupUsers();
});

describe('Validate User States', () => {
  it('Verified Bravo', () => {
    asVerifiedAlpha();
    cy.visit('http://localhost:3000/ledger/contract');

    cy.get('[data-testid="AddCircleIcon"]').click();

    cy.get('[data-testid="VLPopup__form__Submit"]').should('be.disabled');

    cy.get('[data-testid=CreateContract__Title]').clear();
    cy.get('[data-testid=CreateContract__Title]').type('My Contract');

    cy.get('[data-testid="VLPopup__form__Submit"]').should('be.disabled');

    cy.get('[data-testid=CreateContract__Subtype-AutoComplete]').clear();
    cy.get('[data-testid=CreateContract__Subtype-AutoComplete]').type('Transport');
    cy.get('li[data-option-index="0"]').click();

    cy.get('[data-testid=Archetype__ChipWrapper]').contains('Logistics');

    cy.get('[data-testid="VLPopup__form__Submit"]').should('be.disabled');

    cy.get('[data-testid=CreateContract__Briefing]').type(
      'This is an example contract{enter}',
    );
    cy.get('[data-testid="VLPopup__form__Submit"]').should('be.enabled');
    cy.get('[data-testid="VLPopup__form__Submit"]').click({ force: true });
  });
});
