import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from '@apollo/client'
import Request from "../Request/Request";
import { User } from '../../Interfaces'

const REQUESTS = gql `
  query user {
    user(id:1) {
      id
      userName
      pendingRequested {
        id
        title
        imageUrl
        borrower {
          id
          userName
          location
          emailAddress
        }
      }
    }
  }
`

const CHANGE_TO_AVAILABLE = gql `
  mutation patchUserBook ($userId: Int!, $bookId: Int!, $borrowerId: Int!) {
    patchUserBook(input: {
        userId: $userId
        bookId: $bookId
        borrowerId: $borrowerId
        status: 0
    }) { userBook {
            bookId
            }
      }
  }
`

const CHANGE_TO_UNAVAILABLE = gql `
  mutation patchUserBook ($userId: Int!, $bookId: Int!, $borrowerId: Int!) {
    patchUserBook(input: {
        userId: $userId
        bookId: $bookId
        borrowerId: $borrowerId
        status: 2
    }) { userBook {
            bookId
            }
      }
  }
`


const PendingRequests = ({ currentUser }: { currentUser: User }) => {
const { loading, error, data, refetch } = useQuery(REQUESTS)
const [ pendingRequests, setPendingRequests ] = useState([])
const [ changeToAvailable ] = useMutation(CHANGE_TO_AVAILABLE)
const [ changeToUnavailable ] = useMutation(CHANGE_TO_UNAVAILABLE)

useEffect(() => {
  if(data) {
    setPendingRequests(data.user.pendingRequested)
  }
}, [data])

const denyRequest = (bookId: string, borrowerId: string) => {
  changeToAvailable({
    variables: {
        userId: parseInt(currentUser.id),
        bookId: parseInt(bookId),
        borrowerId: parseInt(borrowerId),
        status: 0
    }
  })
  refetch()
}

const acceptRequest = (bookId: string, borrowerId: string) => {
  console.log("this should work")
  changeToUnavailable({
    variables: {
      userId: parseInt(currentUser.id),
      bookId: parseInt(bookId),
      borrowerId: parseInt(borrowerId),
      status: 2
    }
  })
  refetch()
}


const getRequests = () => {
  if(data) {
    return pendingRequests.map((request:any) => {
     return <Request 
       key={request.id}
       id={request.id}
       title={request.title}
       imageUrl={request.imageUrl}
       borrower={request.borrower.userName}
       borrowerId={request.borrower.id}
       borrowerLocation={request.borrower.location}
       borrowerEmailAddress={request.borrower.emailAddress}
       currentUser={currentUser}
       denyRequest={denyRequest}
       acceptRequest={acceptRequest}
     />
     })
  }
}

  return(
    <div className="pending-requests">
      {getRequests()}
    </div>
  )
}

export default PendingRequests