import React, { useState, useEffect } from 'react'

import { useLazyQuery, gql } from '@apollo/client'
import { User } from '../../Interfaces'
import "./BorrowedBooks.css"



const BORROWED_BOOKS = gql `
  query user ($id: ID!) {
    user(id: $id) {
        id
        userName
        borrowedBooks {
          id,
          title,
          author,
          imageUrl
      }
    }
  }
`
const BorrowedBooks = () => {

  const currentUser : any = window.localStorage.getItem("currentUser")
  const [ user, setUser ] = useState(JSON.parse(currentUser))
  const [borrowedBooks, setBorrowedBooks ] = useState([])
  const [getBorrowedBooks, {loading, error, data}] = useLazyQuery(BORROWED_BOOKS, {
    variables: { id: user.id }
  })

  useEffect(() => {
    if(data) {
      setBorrowedBooks(data?.user.borrowedBooks)
    }
  }, [data])

  useEffect(() => {
    getBorrowedBooks()
  }, [user])

  const bookList = () => {
    borrowedBooks.map((book: any) => {
      return(
        <div className='borrowed-book'>
          <img src={book.imageUrl} alt='image of book cover'/>
          <h4>{book.title}</h4>
        </div>
      )
     })
  }

  return (
    <div>
      {loading && <h3>Loading...</h3>}
      {!loading && 
        <div className='borrowed-book-section'>
         {bookList()}
        </div>
      }
    </div>
  )
}

export default BorrowedBooks
