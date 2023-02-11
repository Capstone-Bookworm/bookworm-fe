import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import "./BorrowedBooks.css"

interface currentUser {
  userName?: string 
  location?: string
  id?: string
  emailAddress?: string;
  __typename?: string; 
}

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
const BorrowedBooks: React.FC<currentUser | any> = (props) => {
  const [borrowedBooks, setBorrowedBooks ] = useState([])
  const borrowedBooksQuery = useQuery(BORROWED_BOOKS, {
    variables: { id: props.currentUser.id }
  })

  useEffect(() => {
    if(!borrowedBooksQuery.loading) {
      borrowedBooksQuery.refetch()
      setBorrowedBooks(borrowedBooksQuery.data.user.borrowedBooks)
    }
  }, [borrowedBooksQuery.data])

  return (
    <div>
      {borrowedBooksQuery.loading && <h3>Loading...</h3>}
      {!borrowedBooksQuery.loading && 
        <div className='borrowed-book-section'>
         {borrowedBooks.map((book: any) => {
          return(
            <div className='borrowed-book'>
              <img src={book.imageUrl} alt='image of book cover'/>
              <h4>{book.title}</h4>
            </div>
          )
         })}
        </div>
      }
    </div>
  )
}

export default BorrowedBooks
