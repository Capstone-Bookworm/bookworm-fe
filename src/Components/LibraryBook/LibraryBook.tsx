import React from "react";
import './LibraryBook.css'
import { gql, useMutation } from "@apollo/client";


interface UserLibraryBook {
  id: number,
  title: string,
  author: string,
  imageUrl: string,
  availability: boolean
  deleteSelectedBook: any
  returnSelectedBook: any
}

const LibraryBook = (props: UserLibraryBook) => {

  return(
    <div className="my-book-card">
      <img src={props.imageUrl} alt={`Image of ${props.title}`} className={props.availability ? 'book-available': 'book-unavailable'} />
      <h3 className="book-title">{props.title}</h3>
      {props.availability && <button className="delete-btn" onClick={() => props.deleteSelectedBook(props.id)}>Delete From Library</button>}
      {!props.availability && <button className="delete-btn" onClick={() => props.returnSelectedBook(props.id)}>Book Returned</button>}
    </div>
  )
}

export default LibraryBook;