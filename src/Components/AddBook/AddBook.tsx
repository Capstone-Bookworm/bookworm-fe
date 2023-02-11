import { useState, useEffect } from 'react'
import './AddBook.css'
import { gql, useLazyQuery } from '@apollo/client'
import BookSearch from '../BookSearch/BookSearch'

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

  const [titleSearch, setTitle] = useState('')
  const [submitTitle, setSubmitTitle] = useState('')
  
  const [ getSearchResults, {data, loading, error}] = useLazyQuery(GOOGLE_BOOKS, {
    variables: { title: submitTitle}
    })

  const handleChange = (event: {target: HTMLInputElement}) => {
    setTitle(event.target.value)    
  }

  const handleClick = () => {
    setSubmitTitle(titleSearch)
  }

  useEffect(() => {   
    getSearchResults()
  }, [submitTitle])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <section className='add-book-page'>
      <div className='search-form'>
        <h1 className='search-header'>Search For Book by Title: </h1>
        <input
          type='title'
          className='search-input'
          placeholder='Search by Title'
          value={titleSearch}
          onChange={handleChange}
        />
        <button className='search-button' onClick={handleClick}>Search</button>
      </div>
      <div className='books-container'>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        data && <BookSearch searchResults={data.googleBooks}/>
      )}

      {submitTitle === '' && <h1 className='empty-search'>Search a title above to find a book to add to your library</h1>}

      </div>
    </section>
  )
}

export default AddBook;