import { useState } from 'react'
import './BookSearch.css'
import { gql, useMutation } from '@apollo/client'
import BookResult from '../BookResult/BookResult'

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

  const currentUser : any = window.localStorage.getItem("currentUser")
  const [ user, setUser ] = useState(JSON.parse(currentUser))
  // const [allBooks, setBooks] = useState(searchResults)
  const [savedBook, setSavedBook] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const [ addBook ] = useMutation(ADD_BOOK)
    
  const addToLibrary = (isbn: string) => {
    let selectedBook = searchResults.find(book => {
      return book.isbn === isbn
    })
    console.log(selectedBook)
    addBook({
      variables: {
        userId: user.id,
        isbn: selectedBook?.isbn,
        title: selectedBook?.title,
        author: selectedBook?.author,
        summary: selectedBook?.summary,
        pageCount: selectedBook?.pageCount,
        imageUrl: selectedBook?.imageUrl
      }
    })
    setSavedBook(true)
    setSaveMessage(`Added ${selectedBook?.title} to ${user.userName}'s books`)
  }

  const bookResults = () => {
    return searchResults.map((book: Book) => {
      return (
        <BookResult 
          key={book.isbn} 
          imageUrl={book.imageUrl}
          title={book.title}
          isbn={book.isbn}
          author={book.author}
          pageCount={book.pageCount}
          addToLibrary={addToLibrary}
        />
      )

    })}



  return (
    <div className='book-page-container'>
      {savedBook && <h2>{saveMessage}</h2>}
      <div className='book-card-container'>
        {bookResults()}
      </div>
    </div>
  )
}

export default BookSearch
