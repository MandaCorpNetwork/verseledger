export const login = (as: 'verified' | 'unverified' | 'none') => {
  cy.session(as, () => {
    if (as === 'none') {
      return cy.visit('http://localhost:3000', {
        onBeforeLoad: () => {
          window.localStorage.removeItem('AccessToken');
          window.localStorage.removeItem('RefreshToken');
        },
      });
    }
    cy.request('POST', `http://localhost:3030/@TESTING/users/${as}`, {}).then((res) => {
      const user = res.body;
      cy.request(`http://localhost:3030/@TESTING/users/signed?id=${user.id}`).then(
        (response) => {
          const accessToken = response.body.accessToken;
          const refreshToken = response.body.refreshToken;

          cy.visit('http://localhost:3000', {
            onBeforeLoad: () => {
              window.localStorage.setItem('AccessToken', accessToken);
              window.localStorage.setItem('RefreshToken', refreshToken);
            },
          });
        },
      );
    });
  });
};
export const asNone = () => {
  login('none');
};
export const asVerified = () => {
  login('verified');
};
export const asUnverified = () => {
  login('unverified');
};
