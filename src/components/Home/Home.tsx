import React, { useState, useEffect } from 'react'
import Book from '../Book/Book'
import './Home.css'

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
    <div>
      <h2>Home page</h2>
      <div className='book-container'>
        {bookList}
      </div>
    </div>
  )
}

export default Home
