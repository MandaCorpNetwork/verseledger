export const login = (
  as: 'verified' | 'unverified' | 'none',
  id = 0,
  name = `${as} user`,
) => {
  cy.session(`${as}__${name}`, () => {
    if (as === 'none') {
      return cy.visit('http://localhost:3000', {
        onBeforeLoad: () => {
          window.localStorage.removeItem('AccessToken');
          window.localStorage.removeItem('RefreshToken');
        },
      });
    }
    createOrFetchUser(as === 'verified', id, name).then((res) => {
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

export const createOrFetchUser = (verified: boolean, id = 0, name: string) => {
  return cy.request(
    'POST',
    `http://localhost:3030/@TESTING/users/${verified ? 'verified' : 'unverified'}?name=${name}&id=${id}`,
    {},
  );
};

export const setupUsers = () => {
  createOrFetchUser(false, 0, 'Unverified User');
  createOrFetchUser(true, 1, 'Alpha');
  createOrFetchUser(true, 2, 'Bravo');
};

export const asNone = () => {
  login('none');
};
export const asVerifiedAlpha = () => {
  login('verified', 1, 'Alpha');
};
export const asVerifiedBravo = () => {
  login('verified', 2, 'Bravo');
};
export const asUnverified = () => {
  login('unverified');
};
