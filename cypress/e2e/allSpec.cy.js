describe('Login Page spec', () => {
  it('Should be able to sign in', () => {
    cy.visit('http://localhost:3000/') 
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      if (req.body.operationName === "userLogin") {
        req.reply({ fixture: "user.json" });
      }
      if (req.body.operationName === "books") {
        req.reply({ fixture: "../fixtures/bookData.json" });
      }
    })
    cy.get('.login-container').should('have.text', 'Book Worm')
    cy.get('.email-login').type('adelle@gmail.com').should('have.value', 'adelle@gmail.com')
    cy.get('.create-acct-form > .login-btn').click()
    cy.get('.book-list').should('be.visible').children().should('have.length', 2)
    cy.get(':nth-child(1) > a > .book-item-image').should('have.attr', 'src', 'http://books.google.com/books/content?id=GbWp8QFX1K0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
    cy.get(':nth-child(2) > a > .book-item-image').should('have.attr', 'src', 'http://books.google.com/books/content?id=UkSLDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
  })
  it('Should have an option to create an account if one doesnt exist', () => {
    cy.visit('http://localhost:3000/') 
    cy.get('.create-acct-msg').contains("Don't have an account?")
      cy.get('.create-acct > .login-btn').click();
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "createUser.json" })
    }).as('createUser')
      cy.get('.email-login').type('evan@gmail.com').should('have.value', 'evan@gmail.com')
      cy.get('.username-login').type('evan').should('have.value', 'evan')
      cy.get('.location-login').type('Chicago, Il').should('have.value', 'Chicago, Il')
      cy.get('.create-account-btn').click()
      cy.get('.login-container').contains("Account created! Log in below")
    })
    it('Should throw an error if user account does not exist', () => {
      cy.visit('http://localhost:3000/') 
        cy.get('.email-login').type('eleanor@gmail.com').should('have.value', 'eleanor@gmail.com')
        cy.get('.create-acct-form > .login-btn').click()
        cy.get('.login-container > h3').should('have.text', "We couldn't find your account, please try again")
    })
    it('Should throw an error if the account email already exists', () => {
      cy.visit('http://localhost:3000/')
      cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ status: 500})
    }).as('existingUser') 
      cy.get('.create-acct > .login-btn').click()
      cy.get('.email-login').type('joshua@gmail.com').should('have.value', 'joshua@gmail.com')
      cy.get('.username-login').type('joshua').should('have.value', 'joshua')
      cy.get('.location-login').type('Denver, CO').should('have.value', 'Denver, CO')
      cy.get('.create-account-btn').click()
      cy.get('.login-container').contains('That account already exists please choose another one')
    })
    it('Should require all fields to be filled in when creating a new account', () => {
      cy.visit('http://localhost:3000/') 
      cy.get('.create-acct > .login-btn').click()
      cy.get('.create-account-btn').click()
      cy.get('.email-login').should('have.attr', 'required')
      cy.get('.username-login').should('have.attr', 'required')
      cy.get('.location-login').should('have.attr', 'required')
    })
})

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
})

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

describe('My Pending Requests Dashboard View flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/') 
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      if (req.body.operationName === "userLogin") {
        req.reply({ fixture: "user.json" });
      }
      if (req.body.operationName === "books") {
        req.reply({ fixture: "bookData.json" })
      }
      if (req.body.operationName === "user") {
        req.reply({ fixture: "myBooks.json" })
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
    cy.get('.welcome-display').should('have.text', 'Welcome Lauren!')
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
      req.reply({ fixture: "pendingRequests.json"})
    }).as('pendingRequests')
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "makeUnavailable.json"})
    }).as('accept')
    cy.get('.book-request').should('have.length', '1')
    cy.get('#accept').click()
    cy.get('.book-request').should('have.length', '0')
  })
  it('Should be able to deny pending request', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "pendingRequests.json"})
    }).as('pendingRequests')
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "makeunAvailable.json"})
    }).as('deny')
    cy.get('#deny').click()
    cy.get('body').contains('No pending requests at this time')
  })
  it('Should return the user to the home page in the event of a server error', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ error: 400 })
        }).as('serverError')
        cy.get('[href="/dashboard"]').click()
        cy.get('.error-modal').contains('Oops! Something went wrong!')
        cy.get('.error-modal').contains('Server response was missing for query \'user\'')
        cy.get('.dismiss-button').click()
  })
})

describe('My Borrowed Books Dashboard View flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/') 
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      if (req.body.operationName === "userLogin") {
        req.reply({ fixture: "user.json" })
      }
      if (req.body.operationName === "books") {
        req.reply({ fixture: "bookData.json" })
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
  it('Should return the user to the home page in the event of a server error', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ error: 400 })
        }).as('serverError')
        cy.get('[href="/dashboard"]').click()
        cy.get('.error-modal').contains('Oops! Something went wrong!')
        cy.get('.error-modal').contains('Server response was missing for query \'user\'')
        cy.get('.dismiss-button').click()
  })
})

describe('My Add a Book Dashboard View flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/') 
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      if (req.body.operationName === "userLogin") {
        req.reply({ fixture: "user.json" })
      }
      if (req.body.operationName === "books") {
        req.reply({ fixture: "bookData.json" })
      }
      if (req.body.operationName === "user") {
        req.reply({ fixture: "myBooks.json" })
      }
      if (req.body.operationName === "googleBooks") {
        req.reply({ fixture: "googleBooks.json" })
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
  })
  it('Should allow user to search for a book to add to their library', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "googleBooks.json"})
        }).as('googleBooks')
    cy.get('.search-header').should('have.text', 'Search for a book by title to add your library ')
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
  it('Should let the user know if their search returned no books', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixture: "googleBooks.json"})
        }).as('googleBooks')
        cy.get('.search-input').should('have.value', '')
        cy.get('.search-button').should('have.attr', 'disabled')
  })
  it('Should return the user to the home page in the event of a 500 server error', () => {
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ error: 500 })
        }).as('serverError')
        cy.get('.search-input').type('Elsewhere')
        cy.get('.error-modal').contains('Oops! Something went wrong!')
        cy.get('.error-modal').contains('Server response was missing for query \'GoogleBooks\'.')
        cy.get('.dismiss-button').click()
  })
})