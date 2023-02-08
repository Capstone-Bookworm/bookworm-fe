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
  const { loading } = useQuery(BOOK_DETAILS)
  const [bookDetails, setBookDetails] = useState(detailsQuery)
  console.log('DETAILS QUERY', bookDetails)

  return(
    <div>
      {loading && <h3>Loading...</h3>} 
      {!loading && <div>
      <h4>{bookDetails.data.title}</h4>
      <p>{bookDetails.data.summary}</p>
      <h5>{bookDetails.data.author}</h5>
      <h5>{bookDetails.data.pageCount}</h5>
      <select>
        <option>Choose a borrower...</option>
        {bookDetails.data.users.map((user: any) => {
          return(
            <option>{user.userName}</option>)
        })}
      </select>
      </div>}
    </div>
  )
}

export default BookDetails