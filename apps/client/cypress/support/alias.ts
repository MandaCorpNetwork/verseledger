export const setupAliases = () => {
  cy.intercept('http://localhost:3030/users/@me').as('fetchCurrentUser');
};
