import { useState } from 'react'
import './BookSearch.css'

interface Books {
  searchResults: Book[]
}

interface Book {
  isbn: number,
  title: string,
  author: string,
  imageUrl: string,
  summary: string,
  pageCount: number
}

const BookSearch = ({searchResults}: Books) => {
const [allBooks, setBooks] = useState(searchResults)

  return (
    <div className='book-card-container'>
      {allBooks.map((book: Book) => {
      return (
        <div className='book-card'>
          <img className='book-image' src={book.imageUrl} alt={`image of ${book.title}`}></img>
          <div className='image-overlay'>
            <p>Isbn: {book.isbn}</p>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <p>Page Count: {book.pageCount}</p>
          </div>
          <button className='add-btn'>Add to Library</button>
        </div>
      )
      })}
    </div>
  )
}

export default BookSearch
