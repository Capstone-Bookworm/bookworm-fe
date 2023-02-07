import React from 'react'
import './Book.css'
import { NavLink } from 'react-router-dom'

interface book {
    id: number
    imageURL: string
}

const Book: React.FC<book> = ({ id, imageURL }): JSX.Element => {
  return (
    <div className='book-item'>
      <NavLink to='/details'>
        <img src={imageURL} alt="Book cover" />
      </NavLink>
    </div>
  )
}

export default Book