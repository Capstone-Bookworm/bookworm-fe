import { useState } from 'react'
import './BookSearch.css'
import { gql, useMutation } from '@apollo/client'

interface Books {
  searchResults: Book[],
  currentUser: any
}

interface Book {
  isbn: string,
  title: string,
  author: string,
  imageUrl: string,
  summary: string,
  pageCount: number
}

const ADD_BOOK = gql `
  mutation createBook ($userId: ID!, $isbn: String!, $title: String!, $author: String!, $summary: String!, $pageCount: Int!, $imageUrl: String!) {
    createBook (input: {
    userId: $userId
    isbn: $isbn
    title: $title
    author: $author
    summary: $summary
    pageCount: $pageCount
    imageUrl: $imageUrl
  }) { book {
    id
    isbn
    title
    author
    summary
    pageCount
    imageUrl
      }
    }
  }
`

const BookSearch = ({searchResults, currentUser}: Books) => {
const [allBooks, setBooks] = useState(searchResults)

const [ addBook ] = useMutation(ADD_BOOK)

  const addToLibrary = (isbn: any) => {
    let selectedBook = searchResults.filter(book => {
      return book.isbn === isbn
    })
    addBook({
      variables: {
        userId: currentUser.userLogin.id,
        isbn: selectedBook[0].isbn,
        title: selectedBook[0].title,
        author: selectedBook[0].author,
        summary: selectedBook[0].summary,
        pageCount: selectedBook[0].pageCount,
        imageUrl: selectedBook[0].imageUrl
      }
    })
     
  }

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
          <button className='add-btn' onClick={() => addToLibrary(book.isbn)}>Add to Library</button>
        </div>
      )
      })}
    </div>
  )
}

export default BookSearch
