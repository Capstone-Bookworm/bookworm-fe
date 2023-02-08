import React, { useState } from 'react'
import './Book.css'
import { NavLink } from 'react-router-dom'

interface book {
    id: number
    imageUrl: string
}

const Book: React.FC<book> = ({ id, imageUrl }): JSX.Element => {
  return (
    <div className='book-item'>
      <NavLink to={`/details/${id}`} >
        <img src={imageUrl} alt="Book cover"/>
      </NavLink>
    </div>
  )
}

export default Book