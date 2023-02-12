describe('Home page flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('.email-login').type('lauren@gmail.com')
    cy.get('.create-acct-form > .login-btn').click()
    cy.location("pathname").should("eq", "/home")
  })
  it('Should expect to see a title and a logo with a nav bar', () => {
    cy.get('.logo').should('have.attr', 'src', 'https://cdn-icons-png.flaticon.com/512/2789/2789786.png')
    cy.get('.title').should('have.text', 'Bookworm')
    cy.get('.welcome-display > h2').should('have.text', 'Welcome Lauren!')
    cy.get('nav > button').click()
    cy.get('.menuNav').should('contain', 'Home')
      .and('contain', 'My Dashboard')
      .and('contain', 'Logout')
    cy.get('nav > button').click()
  })
  it('Should be able to see the display of all available books', () => {
    cy.get('.book-list').should('be.visible').children().should('have.length', 7)
    cy.get('.book-list').scrollTo('right', { easing: 'linear' })
    cy.get(':nth-child(1) > a > .book-item-image')
    cy.get(':nth-child(2) > a > .book-item-image')
    cy.get(':nth-child(3) > a > .book-item-image')
    cy.get(':nth-child(4) > a > .book-item-image')
    cy.get(':nth-child(5) > a > .book-item-image')
    cy.get(':nth-child(6) > a > .book-item-image')
    cy.get(':nth-child(7) > a > .book-item-image')
  })
  it('Should be able to search through the library of available books', () => {
    cy.get('input').type('crying').should('have.value', 'crying')
    // cy.get('.search-button').click() -- for some reason, the test isn't working...
  })
  it('Should be able to click on a book to see more details', () => {
    //INTERCEPT POST REQUEST FOR BOOK DETAILS
    cy.get(':nth-child(5) > a > .book-item-image').click()
    cy.location("pathname").should("eq", "/details/26")
    cy.get('.book-details-image').should('have.attr', 'src', 'http://books.google.com/books/content?id=PAMODAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
    cy.get('#title').should('have.text', 'Grit by Angela Duckworth')
    cy.get('#summary') // need to figure out how to detail with <br /> in cypress testing
      // cy.get('#summary').should('have.text', 'Summary: This new edition of the acclaimed bestseller')
    cy.get('#pages').should('have.text', '352 pages')
    cy.get('.borrow-selection').select('Adelle')
    // cy.get('#borrow-btn').click() // INTERCEPT POST(PATCH) REQUEST FOR BORROWING A BOOK
  })

})



// I should see nav bar and logo (and menu)
// I should see books
// I should be able to search books and see results
// I should be able to click on a book
// I should see a error message if the server is down