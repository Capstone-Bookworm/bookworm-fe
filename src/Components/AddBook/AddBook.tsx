import { useState, useEffect } from 'react'
import './AddBook.css'
import { gql, useQuery } from '@apollo/client'
import BookSearch from '../BookSearch/BookSearch'
import ServerError from '../ServerError/ServerError'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { User } from '../../Interfaces'

const GOOGLE_BOOKS = gql `
  query GoogleBooks($title: String!){
    googleBooks(title: $title) {
      isbn
      title
      author
      imageUrl
      summary
      pageCount
  }
}
`

const AddBook = () => {
  const currentUser: string = window.localStorage.getItem("currentUser")!
  const [ user, setUser ] = useState<User>(JSON.parse(currentUser))
  const [titleSearch, setTitleSearch] = useState('')
  const [submitTitle, setSubmitTitle] = useState('')
  const [searchMessage, setSearchMessage] = useState(false)
  
  const {data, loading, error, refetch } = useQuery(GOOGLE_BOOKS, {
    variables: { title: submitTitle}
    })

  const handleChange = (event: {target: HTMLInputElement}) => {
    setTitleSearch(event.target.value)    
  }

  const handleClick = () => {
    setSubmitTitle(titleSearch)
    setSearchMessage(true)
    setTitleSearch('')
  }

  useEffect(() => {    
    if (submitTitle) {
      refetch()
    } 
  }, [submitTitle])

  useEffect(() => {
    if(data) {
      refetch()
    }
  }, [data])

  return (
    <section className='add-book-page'>
      <div className='search-container'>
        <h2 className='search-header'>Search for a book by title to add your library </h2>
      <div className='search-form'>
        {error && <ServerError message={error.message}/>}
        <input
          type='title'
          className='search-input'
          placeholder='Search by Title'
          value={titleSearch}
          onChange={handleChange}
        />
        <button className='search-button' onClick={handleClick}>Search</button>
      </div>
      </div>
      <div className='books-container'>
        {loading && <AiOutlineLoading3Quarters className="loading"/> }
        {(data?.googleBooks.length === 0 && searchMessage) ? <h2>No results found. Please try a different search.</h2> : 
        data?.googleBooks.length > 0 && <BookSearch searchResults={data?.googleBooks}/>}
      </div>
    </section>
  )
}

export default AddBook;