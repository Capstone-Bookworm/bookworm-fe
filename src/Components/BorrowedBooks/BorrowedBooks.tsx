import { useState, useEffect } from 'react'
import ServerError from '../ServerError/ServerError'
import Book from '../Book/Book'
import { useQuery, gql } from '@apollo/client'
import "./BorrowedBooks.css"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { UserBook, User } from '../../Interfaces'


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
  const currentUser: string = window.localStorage.getItem("currentUser")!
  const [ user, setUser ] = useState<User>(JSON.parse(currentUser))
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
    return borrowedBooks?.map((book: UserBook, index: number, array: UserBook[]): JSX.Element => {
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
      {!loading && borrowedBooks.length === 0 && <h3>You are currently not borrowing any books.</h3>}
      {!loading && 
        <div className='borrowed-book-section'>
         {bookList()}
        </div>
      }
    </div>
  )
}

export default BorrowedBooks
