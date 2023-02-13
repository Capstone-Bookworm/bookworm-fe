describe('My Pending Requests Dashboard View flow', () => {
  beforeEach(() => {
    //INTERCEPT POST -- shouldn't have to login everytime
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
      req.reply({ fixture: "pendingRequests.json"})
    }).as('pendingRequests')
    cy.get('[href="/dashboard/pending-requests"] > .nav-button-mybooks').click()
  })
  it('Should see a logo, title, welcome message, and navbar menu', () => {
    cy.get('.logo').should('have.attr', 'src', 'https://cdn-icons-png.flaticon.com/512/2789/2789786.png')
    cy.get('.title').should('have.text', 'Bookworm')
    cy.get('.welcome-display > h2').should('have.text', 'Welcome Lauren!')
    cy.get('nav > button').should('be.visible')
    cy.get('.user-dash-nav').should('contain', 'My Books')
      .and('contain', 'My borrowed books')
      .and('contain', 'Pending Requests')
      .and('contain', 'Add a book')
  })
  it('Should see a pending request from another user to borrow their book', () => {
    cy.get('.book-request > img').should('have.attr', 'src', 'http://books.google.com/books/content?id=f9QiDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
    cy.get('h3').should('have.text', 'Joshua requested to borrow The Left Hand of Darkness')
    cy.get('#accept').should('have.text', 'Accept')
    cy.get('#deny').should('have.text', 'Deny') 
  })
  it('Should be able to accept pending request', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "makeUnavailable.json"})
    }).as('accept')
    cy.get('#accept').click()
  })
  it('Should be able to accept pending request', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "makeAvailable.json"})
    }).as('deny')
    cy.get('#deny').click()
  })
})