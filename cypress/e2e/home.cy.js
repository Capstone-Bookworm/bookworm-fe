describe('Home page flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/') 
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      if (req.body.operationName === "userLogin") {
        req.reply({ fixture: "user.json" });
      }
      if (req.body.operationName === "books") {
        req.reply({ fixture: "bookData.json" })
      }
      if (req.body.operationName === "bookSearch") {
        req.reply({ fixture: "bookSearch.json" })
      }
    })
    cy.get('.email-login').type('adelle@gmail.com')
    cy.get('.create-acct-form > .login-btn').click()
  })
  it('Should expect to see a title and a logo with a nav bar', () => {
    cy.get('.logo').should('have.attr', 'src', 'https://cdn-icons-png.flaticon.com/512/2789/2789786.png')
    cy.get('.title').should('have.text', 'Bookworm')
    cy.get('.welcome-display').should('have.text', 'Welcome Lauren!')
    cy.get('nav > button').click()
    cy.get('.menuNav').should('contain', 'My Dashboard')
      .and('contain', 'Logout')
    cy.get('nav > button').click()
    cy.get('.subtitle').contains('Borrow books. Build community.')
    cy.get('.instructions').contains('Browse and select a book you want to borrow')
  })
  it('Should be able to see the display of all available books', () => {
    cy.get('.book-list').should('be.visible').children().should('have.length', 2)
    cy.get(':nth-child(1) > a > .book-item-image').should('have.attr', 'src', 'http://books.google.com/books/content?id=GbWp8QFX1K0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
    cy.get(':nth-child(2) > a > .book-item-image').should('have.attr', 'src', 'http://books.google.com/books/content?id=UkSLDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
  })
  it('Should be able to search through the library of available books', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "bookSearch.json"})
    }).as('bookSearch')
    cy.get('input').type('witches').should('have.value', 'witches')
    cy.wait('@bookSearch')
    cy.get('.search-button').click() 
    cy.get('.search-message').should('have.text', "Search results for \"witches\". Please try a more specific search if your book is not displayed below.")
    cy.get('.book-item-image').should('have.attr', 'src', 'http://books.google.com/books/content?id=UkSLDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "bookData.json"})
    }).as('bookData')
    cy.get('.return-btn').click()
  })
  it('Should be able to click on a book to see more details', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "bookDetails.json"})
    }).as('bookDetails')
    cy.get(':nth-child(1) > a > .book-item-image').click()
    cy.location("pathname").should("eq", "/details/1")
    cy.get('.book-details-image').should('have.attr', 'src', 'http://books.google.com/books/content?id=GbWp8QFX1K0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
    cy.get('#title').should('have.text', 'A Short History Of Nearly Everything by Bill Bryson')
    cy.get('#summary').should('have.text', 'Summary:  This new edition of the acclaimed bestseller')
    cy.get('#pages').should('have.text', '876 pages')
    cy.get('.borrow-selection').select('Adelle: Maine')
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "borrowBook.json"})
    }).as('borrowBook')
    cy.get('.borrow-btn').click()
  })
  it('Should be able to navigate to their dashboard and see their personal library of books', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "myBooks.json"})
    }).as('myBooks')
    cy.get('nav > button').click()
    cy.get('[href="/dashboard"] > li').click()
    cy.location("pathname").should("eq", "/dashboard")
    cy.get('.user-dash-nav').should('contain', 'My Books')
      .and('contain', 'My borrowed books')
      .and('contain', 'Pending Requests')
      .and('contain', 'Add a book')
    cy.get('.user-book-welcome').should('have.text', "Lauren's Books")
    cy.get('.my-books-container').should('be.visible').children().should('have.length', 3)
    cy.get('.my-books-container > :nth-child(2)').contains('Sins and Cigarettes')
    cy.get(':nth-child(2) > .book-unavailable').should('have.attr', 'src', 'http://books.google.com/books/content?id=XU4WxwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api')
    .and('have.css', 'opacity', '0.5')
    cy.get('.my-books-container > :nth-child(1)').contains('The Seven Husbands of Evelyn Hugo')
    cy.get(':nth-child(1) > .book-available').should('have.attr', 'src', 'http://books.google.com/books/content?id=5KlizgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api')
    .and('have.css', 'opacity', '1')
    cy.get('.my-books-container > :nth-child(3)').contains('Tuesdays with Morrie')
    cy.get(':nth-child(3) > .book-unavailable').should('have.attr', 'src', 'http://books.google.com/books/content?id=z2z_6hLoPmgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
      .and('have.css', 'opacity', '0.5')
  })
  it('Should be able to logout of account', () => {
    cy.get('nav > button').click()
    cy.get('[href="/"] > li').click()
    cy.location("pathname").should("eq", "/")
  })
  it('Should return the user to the home page in the event of a server error', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ error: 400 })
        }).as('serverError')
        cy.get('.error-modal').contains('Oops! Something went wrong!')
        cy.get('.error-modal').contains('Please try again later')
        cy.get('.dismiss-button').click()
  })
})
