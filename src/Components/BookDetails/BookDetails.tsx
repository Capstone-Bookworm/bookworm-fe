import React, { useEffect, useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import './BookDetails.css'

const BOOK_DETAILS = gql `
  query BookDetails($id: ID!) {
    book(id: $id) {
      id
      title,
      summary,
      author,
      pageCount,
      imageUrl,
      users {
        id
        userName,
        emailAddress,
        location
      }
    }
  }
`
const BORROW_BOOK = gql `
  mutation BorrowBook( $userId: Int!, $bookId: Int!, $borrowerId: Int!) {
    patchUserBook(input: {
      userId: $userId
      bookId: $bookId
      borrowerId: $borrowerId
      status: 1
    }) 
    { userBook {
      bookId
      }
    }
  }
`

interface details {
  title: string
  summary: string
  author: string
  pageCount: number
  imageUrl: string
  users: {
    userName: string
    emailAddress: string
    location: string
  }[]
}

interface currentUser {
    userName?: string 
    location?: string
    id?: string
    emailAddress?: string;
    __typename?: string; 
}

const BookDetails: React.FC<currentUser | any> = (props) => {
  const [ selectedUser, setSelectedUser ] = useState('')
  const { id } = useParams()

  const detailsQuery = useQuery(BOOK_DETAILS, {
    variables: { id: id }
  })
  const [bookDetails, setBookDetails] = useState<details | null>(null)

  useEffect(() => {
    if(!detailsQuery.loading) {
      setBookDetails(detailsQuery.data.book)
    }
  }, [detailsQuery.data])

  const [ borrowABook ] = useMutation(BORROW_BOOK)

  const findID = (event: React.FormEvent<HTMLOptionElement> | React.ChangeEvent<HTMLSelectElement>) => {
    if(event.currentTarget.value !== 'Choose a borrower...') {
      setSelectedUser(event.currentTarget.value)
    }
  }

  const borrowBook = () => {
    borrowABook({
      variables: {
        userId: parseInt(selectedUser),
        bookId: Number(id),
        borrowerId: parseInt(props.currentUser.id),
        status: 1
      }
    })
  }

  return(
    <div>
      {detailsQuery.loading && <h3 id='loading'>Loading...</h3>}
      {!detailsQuery.loading && 
      <div className='details-container'>
        <img src={bookDetails?.imageUrl} alt='image of book cover'/>
        <div className='book-info'>
        <h2 id='title'>{bookDetails?.title} by {bookDetails?.author}</h2>
        <hr />
        <p id='summary'>Summary: <br/> {bookDetails?.summary}</p>
        <h3 id='pages'>{bookDetails?.pageCount} pages</h3>
        {bookDetails?.users?.map((user: any) => {
              if(user.id === props.currentUser.id) {
                return (<h4>This book is already in your library.</h4>)
              } else {
                return(
                  <div>
                    <select>
                      <option>Choose a borrower...</option>
                      <option onClick={(event) => findID(event)} value={user.id}>{user.userName}</option>
                    </select>
                    <br />
                    <button id='borrow-btn' onClick={borrowBook}>Borrow Book</button>
                  </div>
                )}
            })}
        </div>
      </div>}
    </div>
  )
}

export default BookDetails
