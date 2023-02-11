import React, { useState, useEffect } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { User } from '../../Interfaces'


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
const BorrowedBooks = ({ currentUser }: { currentUser: User | any}) => {

  const [ user, setUser ] = useState(currentUser || JSON.parse(currentUser))
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
    if(currentUser.userName) {
      setUser(currentUser)
      console.log(currentUser)
    } else if (!currentUser.userName) {
      setUser(JSON.parse(currentUser))
      console.log(JSON.parse(currentUser))
    }
  }, [])

  useEffect(() => {
    getBorrowedBooks()
  }, [user])

  return (
    <div>
      {loading && <h3>Loading...</h3>}
      {!loading && 
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
