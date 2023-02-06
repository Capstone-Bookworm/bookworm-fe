import React, { useState, useEffect } from 'react'
// import Book from '../Book/Book';


const fetchData = (): Promise<any> => {
  return fetch('https://6fd168b2-d698-498e-91e5-29866384a6bd.mock.pstmn.io/graphql', {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({
      query: `query {
            books {
              id
              imageUrl
    }}`
    })
  })
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText)
    } else {
      return response.json()
    }
  })
}

const Home: React.FC = () => {
  const [books, setBooks] = useState([])
  const initApp = () => {
    fetchData()
      .then(data => {
        console.log('DATA', data)
        setBooks(data)
      })
  }

  useEffect(() => {
    initApp()
    console.log('boooks', books)
  }, [])

  // const bookList: any = books.map(book => {
  //   console.log('BOOK', book)
  //   return (
  //     <Book 
  //       name={book.userName}
  //       email={book.emailAddress}
  //       location={book.location}
  //     />
  //   )
  // })

  return(
    <div>
      <h2>Home page</h2>
      <div>
        {/* {bookList} */}
      </div>
      {/* <Book books={books}/> */}
    </div>
  )
}

export default Home
