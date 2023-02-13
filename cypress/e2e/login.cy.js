const { createJSDocTypeExpression } = require("typescript");

describe('Login Page spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/') 
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      if (req.body.operationName.includes("userLogin")) {
        req.reply({ fixture: "user.json" });
      }
      if (req.body.operationName.includes("books")) {
        req.reply({ fixture: "bookData.json" });
      }
      if (req.body.operationName.includes("createUser")) {
        req.reply({ fixture: "createUser.json" });
      }
    })
  })
  it('Should be able to sign in', () => {
    cy.get('.login-container').should('have.text', 'Book Worm')
    cy.get('.email-login').type('adelle@gmail.com').should('have.value', 'adelle@gmail.com')
    cy.get('.create-acct-form > .login-btn').click()
  })
  it('Should have an option to create an account if one doesnt exist', () => {
      cy.get('.create-acct').should('have.text', "Don't have an account? Create New Account")
      cy.get('.create-acct > .login-btn').click();
      cy.get('.email-login').type('eleanor@gmail.com').should('have.value', 'eleanor@gmail.com')
      // trying to type courtney in after but it's not clearing...?
      cy.get('.username-login').type('eleanor').should('have.value', 'eleanor')
      cy.get('.location-login').type('Denver, CO').should('have.value', 'Denver, CO')
      // cy.get('.create-account-btn').click()
      //INTERCEPT POST
      cy.get('.email-login').type('courtney@gmail.com').should('have.value', 'courtney@gmail.com')
      cy.get('.create-acct-form > .login-btn').click()
      // cy.get('.email-login').should('have.value', 'courtney@gmail.com')
    })
    // it('Should throw an error if user account does not exist', () => {
    //     cy.get('.email-login').type('eleanor@gmail.com').should('have.value', 'eleanor@gmail.com')
    //     cy.get('.create-acct-form > .login-btn').click()
    //     cy.get('.login-container > h3').should('have.text', "We couldn't find your account, please try again")
    // })
})

 