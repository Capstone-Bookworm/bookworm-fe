import React, { useState, useEffect } from 'react'
import Book from '../Book/Book'
import './Home.css'
import { RxCaretRight, RxCaretLeft } from "react-icons/rx"

const books: {id: number, imageURL: string}[] = [
  { 
      "id": 1,
      "imageURL": "http://books.google.com/books/content?id=30UlEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  }, 
  {
      "id": 2,
      "imageURL": "http://books.google.com/books/content?id=YcUZEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  },
  {
      "id": 3,
      "imageURL" : "http://books.google.com/books/content?id=jhwqEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  }
]

const Home: React.FC = () => {
  const [bookData, setBookData] = useState(books)
  const [searchBook, setSearchBook] = useState('')
  const style = { fontSize: "5em", cursor: 'pointer' }

  const bookList: JSX.Element[] = bookData.map((book: any) => {
    return (
      <Book
        key={book.id}
        id={book.id}
        imageURL={book.imageURL}
      />
    )
  })
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
        {/* <h2>{searchBook}</h2> */}
        <button type='button'>SEARCH</button>
      </form>
      <div className='book-container'>
      <RxCaretLeft style={style}/>
        {bookList}
      <RxCaretRight style={style}/>
      </div>
    </div>
  )
}

export default Home
