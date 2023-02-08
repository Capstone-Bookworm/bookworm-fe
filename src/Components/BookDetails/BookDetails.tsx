import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'

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
      <h3>hey gurl</h3>
      {detailsQuery.loading && <h3>Loading...</h3>}
      {!detailsQuery.loading && <div>
      <img src={bookDetails?.imageUrl} alt='image of book cover'/>
      <h4>{bookDetails?.title}</h4>
      <p>{bookDetails?.summary}</p>
      <h5>{bookDetails?.author}</h5>
      <h5>{bookDetails?.pageCount}</h5>
      <select>
        <option>Choose a borrower...</option>
        {bookDetails.users?.map((user: any) => {
          return(
            <option>{user.userName}</option>)
        })}
      </select>
      </div>}
    </div>
  )
}

export default BookDetails
