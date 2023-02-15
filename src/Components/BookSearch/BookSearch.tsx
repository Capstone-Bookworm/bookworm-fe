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

  const currentUser : any = window.localStorage.getItem("currentUser")
  const [ user, setUser ] = useState(JSON.parse(currentUser))
  const [allBooks, setBooks] = useState(searchResults)
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

  return (
    <div className='book-page-container'>
      {savedBook && <h2>{saveMessage}</h2>}
      {searchResults.length === 0 && <h2>Sorry we could not find any books. Try something more specific!</h2>}
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
