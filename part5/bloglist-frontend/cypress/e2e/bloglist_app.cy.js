describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND_URL')}/testing/reset`);
    const user = {
      name: 'Generic Test Dummy',
      username: 'testio',
      password: 'password123456',
    };
    cy.request('POST', `${Cypress.env('BACKEND_URL')}/users`, user);
    cy.visit('');
  });

  it('Login form is shown', function () {
    cy.contains('login').click();
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('testio');
      cy.get('#password').type('password123456');
      cy.get('#login-button').click();
      cy.contains('Generic Test Dummy logged in');
      cy.get('.notification')
        .should('contain', 'Hello, Generic Test Dummy!')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
    });

    it('fails with wrong username', function () {
      cy.contains('login').click();
      cy.get('#username').type('wrongUsername');
      cy.get('#password').type('password123456');
      cy.get('#login-button').click();
      cy.get('.notification')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });

    it('fails with wrong password', function () {
      cy.contains('login').click();
      cy.get('#username').type('testio');
      cy.get('#password').type('wrongPassword');
      cy.get('#login-button').click();
      cy.get('.notification')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testio', password: 'password123456' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#new-title').type('Test Blog');
      cy.get('#new-author').type('Some Guy');
      cy.get('#new-url').type('test.url.com');
      cy.get('#new-blog-button').click();
      cy.contains('Test Blog Some Guy');
      cy.get('.notification')
        .should('contain', 'A new blog, Test Blog by: Some Guy has been added.')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test Blog',
          author: 'Testonio',
          url: 'some.url.nonono',
        });
      });

      it.only('it can be liked', function () {
        cy.contains('view').click();
        cy.contains('likes 0');
        cy.contains('like').click();
        cy.wait(500);
        cy.contains('likes 1');
      });
    });
  });
});
