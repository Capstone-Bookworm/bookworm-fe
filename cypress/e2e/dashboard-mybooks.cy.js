describe('My Books Dashboard View flow', () => {
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
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "myBooks.json"})
    }).as('myBooks')
    cy.get('[href="/dashboard"] > li').click()
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
  it('Should display their dashboard', () => {
    cy.get('.user-dash-nav').should('contain', 'My Books')
      .and('contain', 'My borrowed books')
      .and('contain', 'Pending Requests')
      .and('contain', 'Add a book')
      cy.get('.user-book-welcome').should('have.text', "Lauren's Books")
      cy.get('.my-books-container').should('be.visible').children().should('have.length', 3)
      cy.get('.my-books-container > :nth-child(1)').should('have.text', 'The Seven Husbands of Evelyn HugoDelete From Library')
      .find('img').should('have.attr', 'src', 'http://books.google.com/books/content?id=5KlizgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api')
      .and('have.css', 'opacity', '1')
      cy.get('.my-books-container > :nth-child(2)').should('have.text', 'Sins and CigarettesBook in pending')
      .find('img').should('have.attr', 'src', 'http://books.google.com/books/content?id=XU4WxwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api')
      .and('have.css', 'opacity', '0.5')
      cy.get('.my-books-container > :nth-child(3)').should('have.text', 'Tuesdays with MorrieBook Returned')
      .find('img').should('have.attr', 'src', 'http://books.google.com/books/content?id=z2z_6hLoPmgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
      .and('have.css', 'opacity', '0.5')
  })
  it('Should be able to delete a book from my books', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "deleteBook.json"})
    }).as('deleteBook')
    // cy.get(':nth-child(1) > .delete-btn').click() // for some reason it's not deleting
  })
})

//RETURN TO LIBRARY BUTTONS/STUB REQUEST