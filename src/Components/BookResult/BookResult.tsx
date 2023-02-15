import React from 'react'
import './BookResult.css'
import { bookResult } from '../../Interfaces'

const BookResult: React.FC<bookResult> = (props) => {
  return(
  <div className='book-card'>
    <img className='book-image' src={props.imageUrl} alt={`image of ${props.title}`}></img>
      <div className='image-overlay'>
        <p>Isbn: {props.isbn}</p>
        <p>Title: {props.title}</p>
        <p>Author: {props.author}</p>
        <p>Page Count: {props.pageCount}</p>
        <button className='add-btn' onClick={() => props.addToLibrary(props.isbn)}>Add to Library</button>
      </div>
    </div>
  )
}
export default BookResult