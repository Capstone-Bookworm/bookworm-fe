describe('My Add a Book Dashboard View flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/') 
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      if (req.body.operationName === "userLogin") {
        req.reply({ fixture: "user.json" });
      }
    })
    cy.get('.email-login').type('lauren@gmail.com')
    cy.get('.create-acct-form > .login-btn').click()
    cy.get('nav > button').click()
    cy.get('[href="/dashboard"] > li').click()
    cy.get('[href="/dashboard/add-book"] > .nav-button-mybooks').click()
  })
  it('Should see a logo, title, welcome message, and navbar menu', () => {
    cy.get('.logo').should('have.attr', 'src', 'https://cdn-icons-png.flaticon.com/512/2789/2789786.png')
    cy.get('.title').should('have.text', 'Bookworm')
    cy.get('.welcome-display').should('have.text', 'Welcome Lauren!')
    cy.get('.user-dash-nav').should('contain', 'My Books')
      .and('contain', 'My borrowed books')
      .and('contain', 'Pending Requests')
      .and('contain', 'Add a book')
      cy.get('.empty-search').should('have.text', 'Search a title above to find a book to add to your library')
  })
  it('Should allow user to search for a book to add to their library', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "googleBooks.json"})
        }).as('googleBooks')
    cy.get('.search-header').should('have.text', 'Search For Book by Title: ')
    cy.get('.search-input').type('milk and honey').should('have.value', 'milk and honey')
    cy.get('.search-button').click()
    cy.get(':nth-child(1) > .book-image').should('have.attr', 'src', 'http://books.google.com/books/content?id=eYK8vsA8K8MC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
    cy.get(':nth-child(1) > .image-overlay').should('contain', 'Isbn: 9781857884081')
      .and('contain', 'Title: Third Culture Kids 3rd Edition')
      .and('contain', 'Ruth E. Van Reken')
      .and('contain', 'Page Count: 228')
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
    req.reply({ fixture: "addBook.json"})
      }).as('addBook')
      cy.get('.add-btn').click()
      cy.get('.book-page-container').contains('Added Third Culture Kids 3rd Edition to Lauren\'s books')
  })
})