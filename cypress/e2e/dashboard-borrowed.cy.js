describe('My Borrowed Books Dashboard View flow', () => {
  beforeEach(() => {
    //INTERCEPT POST -- shouldn't have to login everytime
    cy.visit('http://localhost:3000/')
    cy.get('.email-login').type('lauren@gmail.com')
    cy.get('.create-acct-form > .login-btn').click()
    cy.get('nav > button').click()
    cy.get('[href="/dashboard"] > li').click()
    cy.get('[href="/dashboard/my-borrowed-books"] > .nav-button-mybooks').click()
  })
  it('Should see a logo, title, welcome message, and navbar menu', () => {
    cy.get('.logo').should('have.attr', 'src', 'https://cdn-icons-png.flaticon.com/512/2789/2789786.png')
    cy.get('.title').should('have.text', 'Bookworm')
    cy.get('.welcome-display > h2').should('have.text', 'Welcome Lauren!')
    cy.get('nav > button').should('be.visible')
  })
  it('Should display their borrowed books', () => {
    cy.get('[href="/dashboard/my-borrowed-books"] > .nav-button-mybooks').click()
    cy.location("pathname").should("eq", "/dashboard/my-borrowed-books")
    cy.get('.borrowed-book-section').should('be.visible').children().should('have.length', 6)
    cy.get('.borrowed-book-section > :nth-child(1)').should('have.text', 'A Short History Of Nearly Everything')
      .find('img').should('have.attr', 'src', 'http://books.google.com/books/content?id=GbWp8QFX1K0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
    cy.get('.borrowed-book-section > :nth-child(2)').should('have.text', 'The Lost Queen')
      .find('img').should('have.attr', 'src', 'http://books.google.com/books/content?id=x7GWDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
    cy.get('.borrowed-book-section > :nth-child(3)').should('have.text', 'Elsewhere')
      .find('img').should('have.attr', 'src', 'http://books.google.com/books/content?id=dR4EnwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api')
    cy.get('.borrowed-book-section > :nth-child(4)').should('have.text', 'The Sovereign Individual')
      .find('img').should('have.attr', 'src', 'http://books.google.com/books/content?id=gxDADwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
    cy.get('.borrowed-book-section > :nth-child(5)').should('have.text', 'To Kill a Mockingbird: A Graphic Novel')
      .find('img').should('have.attr', 'src', 'http://books.google.com/books/content?id=7AgptAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api')
    cy.get('.borrowed-book-section > :nth-child(6)').should('have.text', 'Daring Greatly')
      .find('img').should('have.attr', 'src', 'http://books.google.com/books/content?id=2JFADwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
  })
})
