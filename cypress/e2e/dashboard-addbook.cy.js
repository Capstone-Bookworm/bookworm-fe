describe('My Add a Book Dashboard View flow', () => {
  beforeEach(() => {
    //INTERCEPT POST -- shouldn't have to login everytime 
    cy.visit('http://localhost:3000/')
    cy.get('.email-login').type('lauren@gmail.com')
    cy.get('.create-acct-form > .login-btn').click()
    cy.get('nav > button').click()
    cy.get('[href="/dashboard"] > li').click()
    cy.get('[href="/dashboard/add-book"] > .nav-button-mybooks').click()
  })
  it('Should see a logo, title, welcome message, and navbar menu', () => {
    cy.get('.logo').should('have.attr', 'src', 'https://cdn-icons-png.flaticon.com/512/2789/2789786.png')
    cy.get('.title').should('have.text', 'Bookworm')
    cy.get('.welcome-display > h2').should('have.text', 'Welcome Lauren!')
    cy.get('.user-dash-nav').should('contain', 'My Books')
      .and('contain', 'My borrowed books')
      .and('contain', 'Pending Requests')
      .and('contain', 'Add a book')
      cy.get('.empty-search').should('have.text', 'Search a title above to find a book to add to your library')
  })
  it('Should allow user to search for a book to add to their library', () => {
    cy.get('.search-header').should('have.text', 'Search For Book by Title: ')
    cy.get('.search-input').type('milk and honey').should('have.value', 'milk and honey')
    cy.get('.search-button').click() // -- INTERCEPT POST REQUEST AND ONLY DISPLAY 1 BOOK
    cy.get(':nth-child(1) > .book-image').should('have.attr', 'src', 'http://books.google.com/books/content?id=WoWfCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
    cy.get(':nth-child(1) > .image-overlay').should('contain', 'Isbn: 9781449478650')
      .and('contain', 'Title: Milk and Honey')
      .and('contain', 'Author: Rupi Kaur')
      .and('contain', 'Page Count: 208')
    cy.get(':nth-child(1) > .image-overlay > .add-btn') //click -- INTERCEPT POST REQUEST
  })
})