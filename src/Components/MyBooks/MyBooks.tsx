import React, {useState, useEffect} from "react";
import { useQuery, gql } from "@apollo/client";
import LibraryBook from '../LibraryBook/LibraryBook'
import { User } from '../../Interfaces'


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

  const { loading, error, data, refetch } = useQuery(MY_BOOKS, {
    variables: {
      id: currentUser.id
    }
  })

  const [ availLibrary, setAvailLibrary ] = useState([])
  const [ unavailLibrary, setUnavailLibrary ] = useState([])
  const [ pendingRequests, setPendingRequests ] = useState([])

  
  useEffect(() => {
    if(!loading && !error){
      // console.log(data)
      refetch()
      setAvailLibrary(data.user.availableBooks)
      setUnavailLibrary(data.user.unavailableBooks)
      setPendingRequests(data.user.pendingRequested)
  }
  }, [data])

  // useEffect(() => {
  //   getUserBooks()
  // }, [])

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
      {getLibrary(pendingRequests, false)}
      {getLibrary(unavailLibrary, false)}
    </div>
  )
}

export default MyBooks