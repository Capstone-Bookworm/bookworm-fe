import React from "react";
import './LibraryBook.css'

interface UserLibraryBook {
  id: number,
  title: string,
  author: string,
  imageUrl: string,
  availability: boolean
}

const LibraryBook = (props: UserLibraryBook) => {

  const deleteBook = (id: number) => {
    console.log(id)
    
  }

  return(
    <div className="my-book-card">
      <img src={props.imageUrl} alt={`Image of ${props.title}`} className={props.availability ? 'book-available': 'book-unavailable'} />
      <h3 className="book-title">{props.title}</h3>
      <button className="delete-btn" onClick={() => deleteBook(props.id)}>Delete From Library</button>
    </div>
  )
}

export default LibraryBook;