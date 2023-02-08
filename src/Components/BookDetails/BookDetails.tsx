import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'
import './BookDetails.css'

const BOOK_DETAILS = gql `
  query BookDetails($id: ID!) {
    book(id: $id) {
      title,
      summary,
      author,
      pageCount,
      imageUrl,
      users {
        userName,
        emailAddress,
        location
      }
    }
  }
`

const BookDetails = () => {
  const { id } = useParams()

  const detailsQuery = useQuery(BOOK_DETAILS, {
    variables: { id: id }
  })
  const [bookDetails, setBookDetails] = useState<any>({})

  useEffect(() => {
    if(!detailsQuery.loading) {
      setBookDetails(detailsQuery.data.book)
    }
  }, [detailsQuery.data])

  return(
    <div>
      {detailsQuery.loading && <h3>Loading...</h3>}
      {!detailsQuery.loading && 
      <div className='details-container'>
        <img src={bookDetails?.imageUrl} alt='image of book cover'/>
        <div className='book-info'>
        <h2 id='title'>{bookDetails?.title} by {bookDetails?.author}</h2>
        <hr />
        <p id='summary'>Summary: <br/> {bookDetails?.summary}</p>
        <h3 id='pages'>{bookDetails?.pageCount} pages</h3>
        <select>
          <option>Choose a borrower...</option>
            {bookDetails.users?.map((user: any) => {
              return(
              <option>{user.userName}</option>)
            })}
        </select>
        </div>
      </div>}
    </div>
  )
}

export default BookDetails
