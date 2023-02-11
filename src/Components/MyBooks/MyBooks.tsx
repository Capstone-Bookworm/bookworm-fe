import React, {useState, useEffect} from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import LibraryBook from '../LibraryBook/LibraryBook'
import { User } from '../../Interfaces'
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

const MyBooks = ( { currentUser }: { currentUser: User | any}) => {
  console.log("HIII", currentUser)

  const { loading, error, data, refetch } = useQuery(MY_BOOKS, {
    variables: {
      id: currentUser.id
    }
  })

  const [ availLibrary, setAvailLibrary ] = useState([])
  const [ unavailLibrary, setUnavailLibrary ] = useState([])
  const [ pendingRequests, setPendingRequests ] = useState([])
  const [ deleteBook ] = useMutation(DELETE_BOOK)
  
  useEffect(() => {
    if(data){
      refetch()
      setAvailLibrary(data.user.availableBooks)
      setUnavailLibrary(data.user.unavailableBooks)
      setPendingRequests(data.user.pendingRequested)
  }
  }, [data])

  const deleteSelectedBook = (id: number) => {
    let currentUser = JSON.parse(localStorage.currentUser)
    deleteBook({
      variables: {
        userId: currentUser.id,
        bookId: id
      }
    })
    refetch()
  }

  const getLibrary = (library:UserBook[], availability: boolean) => {
    if(!loading) {
      return library.map((book:any)=> {
       return <LibraryBook 
           key={book.id}
           id={book.id}
           title={book.title}
           author={book.author}
           imageUrl={book.imageUrl}
           availability={availability}
           deleteSelectedBook={deleteSelectedBook}
         />
     })
    }
  }

  return (
    <div className="my-books-container">
      {getLibrary(availLibrary, true)}
      {getLibrary(pendingRequests, false)}
      {getLibrary(unavailLibrary, false)}
    </div>
  )
}

export default MyBooks