import { useState, useEffect } from 'react'
import ServerError from '../ServerError/ServerError'
import Book from '../Book/Book'
import { useQuery, gql } from '@apollo/client'
import "./BorrowedBooks.css"
import { AiOutlineLoading3Quarters } from "react-icons/ai";




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
  const { loading, error, data, refetch } = useQuery(BORROWED_BOOKS, {
    variables: { id: user.id }
  })

  useEffect(() => {
    if(data) {
      setBorrowedBooks(data?.user.borrowedBooks)
    }
  }, [data])

  useEffect(() => {
    refetch()
  }, [user])

  const bookList = () => {
    return borrowedBooks?.map((book: any) => {
      return(
        <Book 
          key={book.id}
          id={book.id}
          imageUrl={book.imageUrl}
          title={book.title}
        />
      )
     })
  }

  return (
    <div className='borrowed-books-container'>
      {error && <ServerError message={error.message}/>}
      {loading && <AiOutlineLoading3Quarters className="loading"/>}
      {!loading && 
        <div className='borrowed-book-section'>
          {borrowedBooks.length === 0 && <h2>You are currently not borrowing any books.</h2>}
         {bookList()}
        </div>
      }
    </div>
  )
}

export default BorrowedBooks
