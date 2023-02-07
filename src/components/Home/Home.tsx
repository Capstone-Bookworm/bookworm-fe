import React, { useState, useEffect } from 'react'
import Book from '../Book/Book'
import './Home.css'
import { RxCaretRight, RxCaretLeft } from "react-icons/rx"

// const SEARCH_BOOKS = gql`
//   mutation searchBooks {
//     searchBooks (limit: 10) {
//       title
//       imageURL
//       ISBN
//       author
//       pageCount
//       summary
//     }
//   }`

// const BOOKS_DATA = gql `
// {
//     booksData {
//       id 
//       imageURL
//   }
// }`

const books: {id: number, title: string, imageURL: string}[] = [
  { 
      "id": 1,
      "title": "Crying In H Mart",
      "imageURL": "http://books.google.com/books/content?id=30UlEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  }, 
  {
      "id": 2,
      "title": "A Food Adventurer's Guide",
      "imageURL": "http://books.google.com/books/content?id=YcUZEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  },
  {
      "id": 3,
      "title": "Good Intentions",
      "imageURL" : "http://books.google.com/books/content?id=jhwqEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  }, 
  {
    "id": 4,
    "title": "A Food Adventurer's Guide",
    "imageURL": "http://books.google.com/books/content?id=YcUZEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
},
{
    "id": 5,
    "title": "Good Intentions",
    "imageURL" : "http://books.google.com/books/content?id=jhwqEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
}
]

const Home: React.FC = () => {
  const [bookData, setBookData] = useState(books)
  // const [bookData, setBookData] = useState(BOOKS_DATA)
  const [searchBook, setSearchBook] = useState('')
  const [searchMessage, setSearchMessage] = useState('')
  const style = { fontSize: "5em", cursor: 'pointer' }
  // const { loading, error, data } = useQuery(BOOKS_DATA)
  
  const bookList: JSX.Element[] = bookData.map((book: any) => {
    return (
      <Book
      key={book.id}
      id={book.id}
      title={book.title}
      imageURL={book.imageURL}
      />
      )
    })
    
    const handleClick = () => {
    // const { loading, error, data } = useQuery(SEARCH_BOOKS)
    // setBookData(data)
    const filterSearch = books.filter(book => book.title.toLowerCase().includes(searchBook.toLowerCase()))
    setBookData(filterSearch)
    setSearchMessage(`Search results for "${searchBook}". Please try a more specific search if your book is not displayed below.`)
    // setSearchBook('')
  }

  // const randomizeBooks = () => {
  //   //will need to refetch 5 more books and switch it out for another if user clicks either arrow
  // }

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
        <button type='button' onClick={handleClick}>SEARCH</button>
      </form>
      <h2 className='search-message'>{searchMessage}</h2>
      <div className='book-container'>
      <RxCaretLeft style={style} id='left-arrow'/>
        {bookList}
      <RxCaretRight style={style} id='right-arrow'/>
      </div>
    </div>
  )
}

export default Home
