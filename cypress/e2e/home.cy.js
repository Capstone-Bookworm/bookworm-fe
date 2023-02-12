describe('Login Page spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/') 
    // cy.intercept('https://bookworm-be.herokuapp.com/graphql',
    // cy.stub()
    //   .callsFake(req => req.reply({ fixture: 'user.json' }))).as('userLogin')
    // cy.wait('@books')
    //   .visit('http://localhost:3000/home') 
  });
  it('Should be able to sign in', () => {
    cy.get('.login-container').should('have.text', 'Book Worm')
    cy.get('.email-login').type('lauren@gmail.com').should('have.value', 'lauren@gmail.com')
    cy.get('.create-acct-form > .login-btn').click()
    // cy.wait('@userLogin')
    //INTERCEPT POST
    cy.visit('http://localhost:3000/home') 
  })
  it('Should have an option to create an account if one doesnt exist', () => {
    cy.get('.create-acct').should('have.text', "Don't have an account? Create New Account")
    cy.visit('http://localhost:3000/');
    cy.get('.create-acct > .login-btn').click();
    cy.get('.email-login').type('eleanor@gmail.com').should('have.value', 'eleanor@gmail.com')
    cy.get('.username-login').type('eleanor').should('have.value', 'eleanor')
    cy.get('.location-login').type('Denver, CO').should('have.value', 'Denver, CO')
    // cy.get('.create-account-btn').click()
    //INTERCEPT POST
    cy.get('.login-btn').click()
    cy.get('.email-login').should('have.value', 'eleanor@gmail.com')
  })
  it('Should throw an error if user account does not exist', () => {
    cy.get('.email-login').type('eleanor@gmail.com').should('have.value', 'eleanor@gmail.com')
    cy.get('.create-acct-form > .login-btn').click()
    cy.get('.login-container > h3').should('have.text', "We couldn't find your account, please try again")
  })
})
// })


// describe('Excersises List Page', () => {
//   beforeEach(() => {
//     cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
//       req.reply({
//         statusCode: 200,
//         body: MOCK_RESPONSES[req.body.operationName],
//       });
//     });
//   });

// })

// cy.intercept('POST', 'https://bookworm-be.herokuapp.com/graphql', (req) => {
  //   aliasMutation(req, 'userLogin')
  
  //   if (hasOperationName(req, 'userLogin')) {
    //     req.alias = 'login'
    
    //     req.reply({
      //       fixture: 'user.json'
      //     })
      //   }
      // })

      // cy.intercept('https://bookworm-be.herokuapp.com/graphql',
      // cy.stub()
      //   .callsFake(req => req.reply({ fixture: 'user.json' }))).as('userLogin')
      // cy.wait(`@userLogin ${emailAddress}`)
      // cy.visit('http://localhost:3000/home') 

      // cy.intercept(
      //   {
      //     method: 'POST',
      //     url: 'https://bookworm-be.herokuapp.com/graphql',
      //     headers: {
      //       'query': 'userLogin',
      //     }
      //   },
      //   {
      //     fixture: 'user.json'
      //   }
      // ).as('userLogin');
      // x-gql-operation-name