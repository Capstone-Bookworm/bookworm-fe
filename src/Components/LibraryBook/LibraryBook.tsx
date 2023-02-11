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
  console.log('PROPS', props)
  return(
    <div>
      <img src={props.imageUrl} className={props.availability ? 'book-available': 'book-unavailable'} />
      <h3>{props.title}</h3>
    </div>
  )
}

export default LibraryBook