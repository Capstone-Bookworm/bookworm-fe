import React from "react";
import './Book.css'

const Book = ({id, imageUrl, title }: {id: string, imageUrl: string, title: string}) => {
  return(
    <div className='borrowed-book'>
      <img src={imageUrl} alt='image of book cover'/>
      <h4>{title}</h4>
    </div>
  )
} 

export default Book