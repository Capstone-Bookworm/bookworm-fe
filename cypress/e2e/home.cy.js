describe('Login Page spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/') 
    // cy.intercept('https://bookworm-be.herokuapp.com/graphql',
    // cy.stub()
    //   .callsFake(req => req.reply({ fixture: 'user.json' }))).as('userLogin')
    // cy.wait('@books')
    //   .visit('http://localhost:3000/home') 
  });
  it('Should display a login box', () => {
    cy.get('.login-container').should('have.text', 'Book Worm')
    cy.get('.email-login').type('lauren@gmail.com').should('have.value', 'lauren@gmail.com')
    cy.get('.create-acct-form > .login-btn').click()
    // cy.wait('@userLogin')
    cy.visit('http://localhost:3000/home') 
  })
  it('Should have an option to create an account if one doesnt exist', () => {
    cy.get('.create-acct').should('have.text', "Don't have an account? Create New Account")
    cy.visit('http://localhost:3000/');
    cy.get('.create-acct-form > .login-btn').click();
    // cy.get('.email-login').type('eleanor@gmail.com').should('have.value', 'eleanor@gmail.com')
    // cy.get('.username-login').type('')
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