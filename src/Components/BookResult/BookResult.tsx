import React from 'react'
import './BookResult.css'

interface Props {
  imageUrl: string;
  title: string;
  isbn: string;
  author: string;
  pageCount: number;
  addToLibrary: (isbn: string) => void
}

const BookResult = ( props: Props ) => {

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