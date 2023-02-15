const { createJSDocTypeExpression } = require("typescript");
import Login from "src/Components/Login/Login";
import Home from "src/Components/Home/Home";
import App from "src/Components/App/App";

describe('Login Page spec', () => {
  it('Should be able to sign in', () => {
    cy.visit('http://localhost:3000/') 
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      if (req.body.operationName === "userLogin") {
        req.reply({ fixtures: "user.json" });
      }
      if (req.body.operationName === "books") {
        req.reply({ fixtures: "bookData.json" });
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
    cy.get('.create-acct').should('have.text', "Don't have an account? Create New Account")
      cy.get('.create-acct > .login-btn').click();
    cy.intercept({ method: "POST", url: "https://bookworm-be.herokuapp.com/graphql" }, (req) => {
      req.reply({ fixtures: "createUser.json"})
    }).as('createUser')
      cy.get('.email-login').type('eleanor@gmail.com').should('have.value', 'eleanor@gmail.com')
      cy.get('.username-login').type('eleanor').should('have.value', 'eleanor')
      cy.get('.location-login').type('Denver, CO').should('have.value', 'Denver, CO')
      cy.get('.create-account-btn').click()
    })
    it('Should throw an error if user account does not exist', () => {
      cy.visit('http://localhost:3000/') 
        cy.get('.email-login').type('eleanor@gmail.com').should('have.value', 'eleanor@gmail.com')
        cy.get('.create-acct-form > .login-btn').click()
        cy.get('.login-container > h3').should('have.text', "We couldn't find your account, please try again")
    })
})
