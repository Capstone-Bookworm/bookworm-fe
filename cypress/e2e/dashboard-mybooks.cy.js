describe('My Books Dashboard View flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/') 
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      if (req.body.operationName === "userLogin") {
        req.reply({ fixture: "user.json" });
      }
      if (req.body.operationName === "books") {
        req.reply({ fixture: "bookData.json" })
      }
    })
    cy.get('.email-login').type('adelle@gmail.com')
    cy.get('.create-acct-form > .login-btn').click()
    cy.get('nav > button').click()
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "myBooks.json"})
    }).as('myBooks')
    cy.get('[href="/dashboard"] > li').click()
  })
  it('Should see a logo, title, welcome message, and navbar menu', () => {
    cy.get('.logo').should('have.attr', 'src', 'https://cdn-icons-png.flaticon.com/512/2789/2789786.png')
    cy.get('.title').should('have.text', 'Bookworm')
    cy.get('.welcome-display').should('have.text', 'Welcome Lauren!')
    cy.get('nav > button').should('be.visible')
    cy.get('.user-dash-nav').should('contain', 'My Books')
      .and('contain', 'My borrowed books')
      .and('contain', 'Pending Requests')
      .and('contain', 'Add a book')
  })
  it('Should display their dashboard', () => {
    cy.get('.user-dash-nav').should('contain', 'My Books')
      .and('contain', 'My borrowed books')
      .and('contain', 'Pending Requests')
      .and('contain', 'Add a book')
      cy.get('.user-book-welcome').should('have.text', "Lauren's Books")
      cy.get('.my-books-container').should('be.visible').children().should('have.length', 3)
      cy.get('.my-books-container > :nth-child(1)').contains('The Seven Husbands of Evelyn Hugo')
      cy.get(':nth-child(1) > .book-available').should('have.attr', 'src', 'http://books.google.com/books/content?id=5KlizgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api')
      .and('have.css', 'opacity', '1')
      cy.get('.my-books-container > :nth-child(2)').contains('Sins and Cigarettes')
      cy.get(':nth-child(2) > .book-unavailable').should('have.attr', 'src', 'http://books.google.com/books/content?id=XU4WxwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api')
      .and('have.css', 'opacity', '0.5')
      cy.get('.my-books-container > :nth-child(3)').contains('Tuesdays with Morrie')
      cy.get(':nth-child(3) > .book-unavailable').should('have.attr', 'src', 'http://books.google.com/books/content?id=z2z_6hLoPmgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
      .and('have.css', 'opacity', '0.5')
      cy.get('.book-available').should('have.attr', 'alt', 'Image of The Seven Husbands of Evelyn Hugo')
      cy.get(':nth-child(3) > .book-unavailable').should('have.attr', 'alt', 'Image of Tuesdays with Morrie')
  })
  it('Should be able to delete a book from my books', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "deleteBook.json"})
    }).as('deleteBook')
    cy.get(':nth-child(1) > .delete-btn').click()
    cy.get('.my-books-container').should("not.contain", "The Seven Husbands of Evelyn HugoDelete From Library")
  })
  it('Should allow a user to declare when their book has been returned', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "returnBook.json"})
    }).as('returnBook')
    cy.get('.return-book-btn').click()
    cy.get('.my-books-container > :nth-child(2)').should('have.css', 'opacity', '1')
  })
  it('Should return the user to the home page in the event of a server error', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ error: 400 })
        }).as('serverError')
        cy.get('[href="/dashboard/pending-requests"]').click()
        cy.get('.error-modal').contains('Oops! Something went wrong!')
        cy.get('.error-modal').contains('Please try again later')
        cy.get('.dismiss-button').click()
  })
})