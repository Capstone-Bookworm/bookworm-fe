import React, { useEffect, useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom'
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

const BookDetails = () => {
  const navigate = useNavigate()


  const currentUser : any = window.localStorage.getItem("currentUser")
  const [ user, setUser ] = useState(JSON.parse(currentUser))
  const [ selectedUser, setSelectedUser ] = useState('')
  const [ matchedUser, setMatchedUser ] = useState('')
  const [ successfulBorrow, setSuccessfulBorrow ] = useState(false)
  const { id } = useParams()

  const detailsQuery = useQuery(BOOK_DETAILS, {
    variables: { id: id }
  })
  const [bookDetails, setBookDetails] = useState<details | null>(null)

  useEffect(() => {
    if(!detailsQuery.loading) {
      setBookDetails(detailsQuery.data.book)
      const userOwnsBook = detailsQuery.data.book.users.some((foundUser: any) => foundUser.id === user.id)
      setMatchedUser(userOwnsBook)
    }
  }, [detailsQuery.data])

  const [ borrowABook, {loading, error, data} ] = useMutation(BORROW_BOOK)

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
        borrowerId: parseInt(user.id),
        status: 1
      }
    })
    if(!error) {
      navigate('/home')
    }
  }


  const borrowerOptions = () => {
    return bookDetails?.users?.map((user: any) => {
      return(
      <option onClick={(event) => findID(event)} key={user.id} value={user.id}>{user.userName}</option>)
    })
  }

  return(
    <div className='details-page'>
      {detailsQuery.loading && <h3 id='loading'>Loading...</h3>}
      {!detailsQuery.loading && 
      <div className='details-container'>
        <img className='book-details-image' src={bookDetails?.imageUrl} alt='image of book cover'/>
        <div className='book-info'>
          <button className='return-home-btn' onClick={() => navigate('/home')}>X</button>
          <h2 id='title'>{bookDetails?.title} by {bookDetails?.author}</h2>
          <hr />
          <p id='summary'>Summary: <br/> {bookDetails?.summary}</p>
          <h3 id='pages'>{bookDetails?.pageCount} pages</h3>
          {matchedUser ? <h4>This book is already in your library.</h4> : 
          <div>
          <select className='borrow-selection' onChange={(event) => findID(event)}>
            <option>Choose a lender...</option>
              {borrowerOptions()}
          </select>
          <br />
          <button className={successfulBorrow ? 'borrow-btn-disable' :'borrow-btn'} onClick={borrowBook}>Borrow Book</button>
          </div>
          }
        </div>
      </div>}
    </div>
  )
}

export default BookDetails
