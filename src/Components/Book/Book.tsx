import React from "react";
import '../LibraryBook/LibraryBook.css'

const Book = ({id, imageUrl, title }: {id: string, imageUrl: string, title: string}) => {
  return(
    <div className='my-book-card'>
      <img className="book-img book-available" src={imageUrl} alt='image of book cover'/>
      <h4 className="book-title">{title}</h4>
    </div>
  )
} 

export default Book