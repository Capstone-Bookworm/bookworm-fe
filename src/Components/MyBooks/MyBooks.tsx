
import { useState, useEffect } from "react";
import { useLazyQuery, gql, useMutation } from "@apollo/client";
import LibraryBook from '../LibraryBook/LibraryBook'
import "./MyBooks.css"

const DELETE_BOOK = gql `
  mutation deleteBook ($userId: ID!, $bookId: ID!) {
    deleteBook (input: {
        userId: $userId
        bookId: $bookId
      }
    ) { success
    }
  }
`

const CHANGE_TO_AVAILABLE = gql `
  mutation patchUserBook ($userId: Int!, $bookId: Int!, $borrowerId: Int!) {
    patchUserBook(input: {
        userId: $userId
        bookId: $bookId
        borrowerId: $borrowerId
        status: 0
    }) { userBook {
            bookId
            }
      }
  }
`

const MY_BOOKS = gql `
  query user($id: ID!) {
    user(id: $id) {
        id
        userName
        availableBooks {
          id
          title
          author
          imageUrl
        }
        unavailableBooks {
          id
          title
          author
          imageUrl
          borrower {
            id
            userName
            location
            emailAddress
          }
        }
        pendingRequested {
          id
          title
          imageUrl
          borrower {
            id
            userName
            location
            emailAddress
          }
        }
    }
  }
`

interface UserBook {
  id: number,
  title: string,
  author: string,
  imageUrl: string
}

const MyBooks = () => {

  const currentUser : any = window.localStorage.getItem("currentUser")
  const [ user, setUser ] = useState(JSON.parse(currentUser))
  const [ availLibrary, setAvailLibrary ] = useState([])
  const [ unavailLibrary, setUnavailLibrary ] = useState([])
  const [ pendingRequests, setPendingRequests ] = useState([])

  const [getMyBooks, { loading, error, data }] = useLazyQuery(MY_BOOKS, {
    variables: {
      id: user.id
    }
  })
  
  const [ deleteBook ] = useMutation(DELETE_BOOK)
  const [ returnBook ] = useMutation(CHANGE_TO_AVAILABLE)
  
  useEffect(() => {
    if(!loading && !error){
      setAvailLibrary(data?.user.availableBooks)
      setUnavailLibrary(data?.user.unavailableBooks)
      setPendingRequests(data?.user.pendingRequested)
  }
  }, [data])

  useEffect(() => {
    getMyBooks()
  }, [user])

  const deleteSelectedBook = (id: number) => {
    deleteBook({
      variables: {
        userId: user.id,
        bookId: id
      }
    })
    getMyBooks()
  }

  const returnSelectedBook = (id: any) => {
    let matchId = data.user.unavailableBooks.find((book: any) => {
      return book.id === id
    })
    let borrowerId = matchId.borrower.id
    console.log(user.id, id, borrowerId)
    returnBook({
      variables: {
        userId: parseInt(user.id),
        bookId: parseInt(id),
        borrowerId: parseInt(borrowerId),
        status: 0
      }
    })
    getMyBooks()
  }

  const getLibrary = (library:UserBook[], availability: boolean) => {
    if(pendingRequests) {
      return library.map((book:any)=> {
       return <LibraryBook 
           key={book.id}
           id={book.id}
           title={book.title}
           author={book.author}
           imageUrl={book.imageUrl}
           availability={availability}
           deleteSelectedBook={deleteSelectedBook}
           returnSelectedBook={returnSelectedBook}
         />
     })
    }
  }

  return (
    <div className="my-books-display">
      <h1 className="user-book-welcome">{user.userName}'s Books</h1>
      <div className="my-books-container">
        {getLibrary(availLibrary, true)}
        {getLibrary(pendingRequests, false)}
        {getLibrary(unavailLibrary, false)}
      </div>
    </div>
  )
}

export default MyBooks