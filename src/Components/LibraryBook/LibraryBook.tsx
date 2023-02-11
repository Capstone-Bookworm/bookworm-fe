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
  return(
    <div className="book-card">
      <img src={props.imageUrl} className={props.availability ? 'book-available': 'book-unavailable'} />
      <h3>{props.title}</h3>
      <button className="delete-btn">Delete From Library</button>
    </div>
  )
}

export default LibraryBook;