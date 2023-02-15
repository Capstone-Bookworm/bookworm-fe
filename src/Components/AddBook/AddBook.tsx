import { useState, useEffect } from 'react'
import './AddBook.css'
import { gql, useQuery } from '@apollo/client'
import BookSearch from '../BookSearch/BookSearch'
import ServerError from '../ServerError/ServerError'

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

interface Books {
  isbn: Number,
  title: String,
  author: String,
  imageUrl: String,
  summary: String,
  pageCount: Number
}

const AddBook = () => {
  const currentUser : any = window.localStorage.getItem("currentUser")
  const [ user, setUser ] = useState(JSON.parse(currentUser))
  const [titleSearch, setTitleSearch] = useState('')
  const [submitTitle, setSubmitTitle] = useState('')
  
  const {data, loading, error, refetch } = useQuery(GOOGLE_BOOKS, {
    variables: { title: submitTitle}
    })

  const handleChange = (event: {target: HTMLInputElement}) => {
    setTitleSearch(event.target.value)    
  }

  const handleClick = () => {
    setSubmitTitle(titleSearch)
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
        {error && <ServerError />}
      <div className='search-form'>
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
      {loading && <h1>Loading ...</h1> }
      {data && <BookSearch searchResults={data?.googleBooks}/>}
      </div>
    </section>
  )
}

export default AddBook;