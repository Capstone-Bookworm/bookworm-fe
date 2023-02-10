import React, {useState, useEffect} from "react";
import { useQuery, gql } from "@apollo/client";
import LibraryBook from '../LibraryBook/LibraryBook'

const MY_BOOKS = gql `
  query user {
    user(id:1) {
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

const MyBooks = () => {
  
  const { loading, error, data, refetch } = useQuery(MY_BOOKS)
  const [ availLibrary, setAvailLibrary ] = useState([])
  const [ unavailLibrary, setUnavailLibrary ] = useState([])
  const [ pendingRequests, setPendingRequests ] = useState([])

  console.log(data?.user.availableBooks)
  
  useEffect(() => {
    if(data){
      refetch()
      setAvailLibrary(data.user.availableBooks)
      setUnavailLibrary(data.user.unavailableBooks)
      setPendingRequests(data.user.pendingRequested)
  }
  }, [data])

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
         />
     })
    }
  }

  return (
    <div>
      {getLibrary(availLibrary, true)}
      {getLibrary(pendingRequests, true)}
      {getLibrary(unavailLibrary, false)}
    </div>
  )
}

export default MyBooks