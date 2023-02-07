import { useState } from 'react'
import { setSyntheticLeadingComments } from 'typescript';
import './AddBook.css'

const AddBook = () => {
  const [titleSearch, setTitle] = useState('')

  console.log(titleSearch)
  
  return (
    <section className='add-book-page'>
      <form className='search-form'>
        <input
          type='title'
          className='search-input'
          placeholder='Search by Title'
          value={titleSearch}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
      <div className='books-container'>

      </div>
    </section>
  )
}

export default AddBook;