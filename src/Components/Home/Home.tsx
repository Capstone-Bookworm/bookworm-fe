import React, { useState, useEffect } from 'react'
import ClickableBook from '../ClickableBook/ClickableBook'
import './Home.css'
import { RxCaretRight, RxCaretLeft } from "react-icons/rx"
import { useQuery, gql } from '@apollo/client'
import { User } from '../../Interfaces'
import ServerError from '../ServerError/ServerError'

const BOOK_SEARCH = gql`
  query BookSearch($title: String!) {   
    bookSearch(title: $title) {
        id
        title
        imageUrl
      }
  }`

const BOOKS_DATA = gql `
    query books {
      books {
      id 
      imageUrl
    }
}`

interface book {
  id: number
  imageUrl: string
}



const Home = ({currentUser}: {currentUser: User | any}) => {
  const [searchBook, setSearchBook] = useState<string>('')
  const [searchMessage, setSearchMessage] = useState<string>('')
  const style = { fontSize: "5em", cursor: 'pointer' }
  const { loading, error, data, refetch } = useQuery(BOOKS_DATA)
  const [bookData, setBookData] = useState([])

  useEffect(() => {
    if(data) {
      refetch()
      setBookData(data.books)
    }
  }, [data])

  const bookList: JSX.Element[] = bookData?.map((book: book) => {
    return (
      <ClickableBook
      key={book.id}
      id={book.id}
      imageUrl={book.imageUrl}
      />
      )
    })

    const searchQuery = useQuery(BOOK_SEARCH, {
      variables: { title: searchBook }})

    const searchBooks = () => {
      setBookData(searchQuery.data.bookSearch)
      setSearchMessage(`Search results for "${searchBook}". Please try a more specific search if your book is not displayed below.`)
  }
    const returnAllBookView = () => {
      refetch()
      setBookData(data.books)
      setSearchMessage('')
      setSearchBook('')
    }

  return(
    <div className='homepage-container'>
      <h2 className='home-display'>My Home</h2>
      {error && <ServerError message={error.message}/>}
      {searchQuery.error && <ServerError message={searchQuery.error.message}/>}
      <form className='form-container'>
        <input 
          type='text'
          value={searchBook}
          placeholder='Search by book title...'
          onChange={event => setSearchBook(event.target.value)}
        />
        <button type='button' className='search-button' onClick={() => searchBooks()}>SEARCH</button>
      </form>
      <h2 className='search-message'>{searchMessage}</h2>
      {searchMessage && <button onClick={returnAllBookView} style={{marginBottom: '5rem'}} className='return-btn'>See All Books</button>}
      {loading ? <h2 className='loading-message'>Loading...</h2> : <div className={`book-container ${bookData.length > 5 ? "display-search" : ""}`}>
        <div className="book-list">
          {bookList}
        </div>
      </div>}
    </div>
  )
}

export default Home
