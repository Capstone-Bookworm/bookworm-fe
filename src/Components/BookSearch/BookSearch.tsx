import { useState } from 'react'
import './BookSearch.css'
import { gql, useMutation } from '@apollo/client'

interface Books {
  searchResults: Book[],
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

const BookSearch = ({searchResults}: Books) => {
const [allBooks, setBooks] = useState(searchResults)
const [savedBook, setSavedBook] = useState(false)
const [saveMessage, setSaveMessage] = useState('')

const [ addBook ] = useMutation(ADD_BOOK)
  
  const addToLibrary = (isbn: string) => {
    let selectedBook = searchResults.filter(book => {
      return book.isbn === isbn
    })
    let newObject: any = window.localStorage.getItem("currentUser")
    let currentUser = JSON.parse(newObject)
    addBook({
      variables: {
        userId: currentUser.id,
        isbn: selectedBook[0].isbn,
        title: selectedBook[0].title,
        author: selectedBook[0].author,
        summary: selectedBook[0].summary,
        pageCount: selectedBook[0].pageCount,
        imageUrl: selectedBook[0].imageUrl
      }
    })
    setSavedBook(true)
    setSaveMessage(`Added ${selectedBook[0].title} to ${currentUser.userName}'s books`)
  }

  return (
    <div className='book-page-container'>
      {savedBook && <h2>{saveMessage}</h2>}
      <div className='book-card-container'>
        {allBooks.map((book: Book) => {
        return (
          <div key={book.isbn} className='book-card'>
            <img className='book-image' src={book.imageUrl} alt={`image of ${book.title}`}></img>
            <div className='image-overlay'>
              <p>Isbn: {book.isbn}</p>
              <p>Title: {book.title}</p>
              <p>Author: {book.author}</p>
              <p>Page Count: {book.pageCount}</p>
              <button className='add-btn' onClick={() => addToLibrary(book.isbn)}>Add to Library</button>
            </div>
          </div>
        )
        })}
      </div>
    </div>
  )
}

export default BookSearch
