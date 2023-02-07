import React from 'react'
import './Book.css'
import { NavLink } from 'react-router-dom'

interface book {
    id: number
    imageUrl: string
}

// const BOOK_DETAILS = gql `
// {
//   bookDetails (bookID) {
//     title
//     summary
//     author
//     pageCount
//     users {
//       userName
//       emailAddress
//       location
//     }
//   }
// }`

const Book: React.FC<book> = ({ id, imageUrl }): JSX.Element => {

  return (
    <div className='book-item'>
      <NavLink to='/details'>
        <img src={imageUrl} alt="Book cover" />
      </NavLink>
    </div>
  )
}

export default Book