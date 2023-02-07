import React from 'react'
import './Book.css'

interface book {
    id: number
    imageURL: string
}

const Book: React.FC<book> = ({ id, imageURL }): JSX.Element => {
  return (
    <div className='book-item'>
      <img src={imageURL} alt="Book cover" />
    </div>
  )
}

export default Book