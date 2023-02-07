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
  const { data } = useQuery(BOOKS_DATA)
  const [bookData, setBookData] = useState(data.books)

  const bookList: JSX.Element[] = bookData.map((book: any) => {
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

  const displayMoreBooks = (event: React.MouseEvent<HTMLElement>) => {
    if(event.currentTarget.id === 'left-arrow'){
      const x = 5
      // setBookData(data.books.slice(x-5, x))
      setBookData(data.books.slice(0, 5))
    }
    if(event.currentTarget.id === 'right-arrow'){
      const x = 10
      // setBookData(data.books.slice(x-5, x+5))
      setBookData(data.books.slice(10, 15))
    } 
  }

  return(
    <div className='homepage-container'>
      <h2>Home page</h2>
      <form className='form-container'>
        <input 
          type='text'
          value={searchBook}
          placeholder='Search by book title...'
          onChange={event => setSearchBook(event.target.value)}
        />
        <button type='button' onClick={() => searchBooks()}>SEARCH</button>
      </form>
      <h2 className='search-message'>{searchMessage}</h2>
      <div className={`book-container ${bookData.length > 5 ? "display-search" : ""}`}>
      <RxCaretLeft style={style} id='left-arrow' onClick={(event: any | React.MouseEvent) => displayMoreBooks(event)}/>
        <div className={`${bookData.length > 5 ? "display-search book-list" : "original-book-list"}`}>
          {bookList}
        </div>
      <RxCaretRight style={style} id='right-arrow' onClick={(event: any | React.MouseEvent) => displayMoreBooks(event)}/>
      </div>
    </div>
  )
}

export default Home
