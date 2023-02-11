import React, { useState, useEffect } from 'react'
import Book from '../Book/Book'
import './Home.css'
import { RxCaretRight, RxCaretLeft } from "react-icons/rx"
import { useQuery, gql } from '@apollo/client'

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

const Home: React.FC = () => {
  const [searchBook, setSearchBook] = useState<string>('')
  const [searchMessage, setSearchMessage] = useState<string>('')
  const style = { fontSize: "5em", cursor: 'pointer' }
  const { loading, data, refetch } = useQuery(BOOKS_DATA)
  const [bookData, setBookData] = useState([])

  useEffect(() => {
    if(data) {
      refetch()
      setBookData(data.books)
    }
  }, [data])

  const bookList: JSX.Element[] = bookData?.map((book: book) => {
    return (
      <Book
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
      setSearchBook('')
  }

  return(
    <div className='homepage-container'>
      <h2 className='home-page-title'>Home page</h2>
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
      {loading ? <h2 className='loading-message'>Loading...</h2> : <div className={`book-container ${bookData.length > 5 ? "display-search" : ""}`}>
      {/* <RxCaretLeft style={style} id='left-arrow' /> */}
        <div className="book-list">
          {bookList}
        </div>
        {/* {`${bookData.length > 5 ? "display-search book-list" : "original-book-list"}`} */}
      {/* <RxCaretRight style={style} id='right-arrow' /> */}
      </div>}
    </div>
  )
}

export default Home
