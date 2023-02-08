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
    }
  }
`


const MyBooks = () => {
  
  const { loading, error, data } = useQuery(MY_BOOKS)
  const [ library, setLibrary ] = useState([])

  console.log(data.user.availableBooks)
  
  useEffect(() => {
    if(data){
      setLibrary(data.user.availableBooks)
    console.log('hi')}
  }, [data])

  const getLibrary = () => {
    if(!loading) {
      return library.map((book:any)=> {
       return <LibraryBook 
           key={book.id}
           id={book.id}
           title={book.title}
           author={book.author}
           imageUrl={book.imageUrl}
         />
     })
    }
  }

  return (
    <div>
      {getLibrary()}
    </div>
  )
}

export default MyBooks