import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'

const BOOK_DETAILS = gql `
  query BookDetails($id: ID!) {
    book(id: $id) {
      title,
      summary,
      author,
      pageCount,
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
  const [bookDetails, setBookDetails] = useState(detailsQuery.data.book)
  console.log('BOOK DETAILS', bookDetails)
  
  return(
    <div>
      <h3>Hi this is the book details page.</h3>
    </div>
  )
}

export default BookDetails