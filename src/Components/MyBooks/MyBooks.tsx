import { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import LibraryBook from '../LibraryBook/LibraryBook'
import "./MyBooks.css"
import ServerError from "../ServerError/ServerError";

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

  const { loading, error, data, refetch } = useQuery(MY_BOOKS, {
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
    refetch()
  }, [user])

  const deleteSelectedBook = (id: number) => {
    deleteBook({
      variables: {
        userId: user.id,
        bookId: id
      }
    })
    refetch()
  }

  const returnSelectedBook = (id: any) => {
    let matchId = data?.user.unavailableBooks.find((book: any) => {
      console.log("In the Find ",book.id)
      return book.id === id
    })
    let borrowerId = matchId.borrower.id
    returnBook({
      variables: {
        userId: parseInt(user.id),
        bookId: parseInt(id),
        borrowerId: parseInt(borrowerId),
        status: 0
      }
    })
    refetch()
  }

  const getLibrary = (library:UserBook[], availability: boolean, unavailable: boolean, pending: boolean) => {
    if(pendingRequests) {
      return library.map((book: any)=> {
          return <LibraryBook 
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            imageUrl={book.imageUrl}
            availability={availability}
            unavailable={unavailable}
            pending={pending}
            deleteSelectedBook={deleteSelectedBook}
            returnSelectedBook={returnSelectedBook}
            contactInfo={book.borrower?.emailAddress || ''}
            location={book.borrower?.location || ''}
          />
     })
    }
  }

  return (
    <div className="my-books-display">
      <h1 className="user-book-welcome">{user.userName}'s Books</h1>
      <div className="my-books-container">
        {error && <ServerError message={error.message}/>}
        {getLibrary(availLibrary, true, false, false)}
        {getLibrary(pendingRequests, false, false, true)}
        {getLibrary(unavailLibrary, false, true, false)}
      </div>
    </div>
  )
}

export default MyBooks