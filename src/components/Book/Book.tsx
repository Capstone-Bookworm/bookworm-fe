import React from 'react'
import './Book.css'
import { NavLink } from 'react-router-dom'

interface book {
    id: number
    title: string
    imageURL: string
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