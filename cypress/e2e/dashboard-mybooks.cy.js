describe('My Borrowed Books Dashboard View flow', () => {
  beforeEach(() => {
    //INTERCEPT POST -- shouldn't have to login everytime
    cy.visit('http://localhost:3000/')
    cy.get('.email-login').type('lauren@gmail.com')
    cy.get('.create-acct-form > .login-btn').click()
    cy.get('nav > button').click()
    cy.get('[href="/dashboard"] > li').click()
  })
  it('Should see a logo, title, welcome message, and navbar menu', () => {
    cy.get('.logo').should('have.attr', 'src', 'https://cdn-icons-png.flaticon.com/512/2789/2789786.png')
    cy.get('.title').should('have.text', 'Bookworm')
    cy.get('.welcome-display > h2').should('have.text', 'Welcome Lauren!')
    cy.get('nav > button').should('be.visible')
  })
  it('Should display their dashboard', () => {
    cy.get('.user-dash-nav').should('contain', 'My Books')
      .and('contain', 'My borrowed books')
      .and('contain', 'Pending Requests')
      .and('contain', 'Add a book')
      cy.get('.user-book-welcome').should('have.text', "Lauren's Books")
      cy.get('.my-books-container').should('be.visible').children().should('have.length', 3)
      cy.get('.my-books-container > :nth-child(1)').should('have.text', 'Tuesdays with Morrie')
        .find('img').should('have.attr', 'src', 'http://books.google.com/books/content?id=z2z_6hLoPmgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
        .and('have.css', 'opacity', '0.5')
      cy.get('.my-books-container > :nth-child(2)').should('have.text', 'Sins and Cigarettes')
        .find('img').should('have.attr', 'src', 'http://books.google.com/books/content?id=XU4WxwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api')
        .and('have.css', 'opacity', '0.5')
      cy.get('.my-books-container > :nth-child(3)').should('have.text', 'The Seven Husbands of Evelyn Hugo')
        .find('img').should('have.attr', 'src', 'http://books.google.com/books/content?id=5KlizgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api')
        .and('have.css', 'opacity', '0.5')
  })
})