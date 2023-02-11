import React, {useState, useEffect} from "react";
import { useLazyQuery, gql } from "@apollo/client";
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
  
  const [ user, setUser ] = useState(currentUser || JSON.parse(currentUser))
  const [ availLibrary, setAvailLibrary ] = useState([])
  const [ unavailLibrary, setUnavailLibrary ] = useState([])
  const [ pendingRequests, setPendingRequests ] = useState([])

  const [getMyBooks, { loading, error, data }] = useLazyQuery(MY_BOOKS, {
    variables: {
      id: user.id
    }
  })


  useEffect(() => {
    if(currentUser.userName) {
      setUser(currentUser)
    } else if (!currentUser.userName) {
      setUser(JSON.parse(currentUser))
    }
    
  }, [])
  
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