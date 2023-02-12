import React, { useState } from 'react'
import './ClickableBook.css'
import { NavLink } from 'react-router-dom'
import BookDetails from '../BookDetails/BookDetails'

interface book {
    id: number
    imageUrl: string
}

const Book: React.FC<book> = ({ id, imageUrl }): JSX.Element => {
  return (
    <div className='book-item'>
      <NavLink to={`/details/${id}`} key={id}>
        <img className='book-item-image' src={imageUrl} alt="Book cover"/>
      </NavLink>
    </div>
  )
}

export default Book