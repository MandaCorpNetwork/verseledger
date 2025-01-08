export const setupAliases = () => {
  cy.intercept('http://localhost:3030/v1/users/@me').as('fetchCurrentUser');
};
