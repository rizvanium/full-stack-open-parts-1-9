Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND_URL')}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('currentUser', JSON.stringify(body));
    cy.visit('');
  });
});
