describe('My Borrowed Books Dashboard View flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/') 
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      if (req.body.operationName === "userLogin") {
        req.reply({ fixture: "user.json" });
      }
    })
    cy.get('.email-login').type('adelle@gmail.com')
    cy.get('.create-acct-form > .login-btn').click()
    cy.get('nav > button').click()
    cy.get('[href="/dashboard"] > li').click()
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "borrowedData.json"})
    }).as('borrowedData')
    cy.get('[href="/dashboard/my-borrowed-books"] > .nav-button-mybooks').click()
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
  it('Should display their borrowed books', () => {
    cy.get('[href="/dashboard/my-borrowed-books"] > .nav-button-mybooks').click()
    cy.location("pathname").should("eq", "/dashboard/my-borrowed-books")
    cy.get('.borrowed-book-section').should('be.visible').children().should('have.length', 3)
    cy.get('.borrowed-book-section > :nth-child(1)').should('have.text', 'Practical Object-oriented Design in Ruby')
      .find('img').should('have.attr', 'src', 'http://books.google.com/books/content?id=rk9sAQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
    cy.get('.borrowed-book-section > :nth-child(2)').should('have.text', 'The Seven Husbands of Evelyn Hugo')
      .find('img').should('have.attr', 'src', 'http://books.google.com/books/content?id=5KlizgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api')
    cy.get('.borrowed-book-section > :nth-child(3)').should('have.text', 'The Carnivore Diet')
      .find('img').should('have.attr', 'src', 'http://books.google.com/books/content?id=YUi4DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
  })
})
