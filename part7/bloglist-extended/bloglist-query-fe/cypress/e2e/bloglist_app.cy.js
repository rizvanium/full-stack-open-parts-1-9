describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND_URL')}/testing/reset`);
    const user1 = {
      name: 'Generic Test Dummy',
      username: 'testio',
      password: 'password123456',
    };
    const user2 = {
      name: 'Another Test Dummy',
      username: 'coolio',
      password: '123456password',
    };
    cy.request('POST', `${Cypress.env('BACKEND_URL')}/users`, user1);
    cy.request('POST', `${Cypress.env('BACKEND_URL')}/users`, user2);
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

      it('it can be liked', function () {
        cy.contains('view').click();
        cy.contains('likes 0');
        cy.contains('like').click();
        cy.wait(500);
        cy.contains('likes 1');
      });

      it('it can be deleted by its creator', function () {
        cy.get('.blog')
          .should('exist')
          .and('contain', 'Test Blog Testonio')
          .as('theBlog');
        cy.contains('view').click();
        cy.get('.remove-button').click();
        cy.wait(500);
        cy.get('@theBlog').should('not.exist');
      });
    });
  });

  describe('When multiple users exist', function () {
    describe('And each user adds a blog', function () {
      beforeEach(function () {
        cy.login({ username: 'coolio', password: '123456password' });
        cy.createBlog({
          title: 'Another Blog',
          author: 'Another Guy',
          url: 'who.cares.nonono',
        });
        cy.login({ username: 'testio', password: 'password123456' });
        cy.createBlog({
          title: 'Test Blog',
          author: 'Testonio',
          url: 'some.url.nonono',
        });
      });

      it("current user can only see remove button of it's own blog and not the other users blog", function () {
        cy.contains('Test Blog Testonio').as('currentUserBlog');
        cy.contains('Another Blog Another Guy').as('otherUserBlog');

        cy.get('@currentUserBlog').contains('view').click();
        cy.get('@otherUserBlog').contains('view').click();

        cy.wait(100);
        cy.get('@currentUserBlog').contains('remove').should('exist');
        cy.get('@otherUserBlog').contains('remove').should('not.exist');
      });

      it('blog with the most likes is moved to the top of the page', function () {
        cy.contains('Test Blog Testonio').as('currentUserBlog');
        cy.contains('Another Blog Another Guy').as('otherUserBlog');

        cy.get('@currentUserBlog').contains('view').click();
        cy.get('@otherUserBlog').contains('view').click();

        cy.wait(100);

        cy.get('@currentUserBlog').contains('like').click();
        cy.wait(200);
        cy.get('.blog').eq(0).should('contain', 'Test Blog');
        cy.get('.blog').eq(1).should('contain', 'Another Blog');

        cy.get('@otherUserBlog').contains('like').click();
        cy.get('@otherUserBlog').contains('like').click();
        cy.wait(200);
        cy.get('.blog').eq(0).should('contain', 'Another Blog');
        cy.get('.blog').eq(1).should('contain', 'Test Blog');
      });
    });
  });
});
