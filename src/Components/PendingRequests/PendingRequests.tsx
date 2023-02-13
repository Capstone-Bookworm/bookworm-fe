import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from '@apollo/client'
import Request from "../Request/Request";
import { User } from '../../Interfaces'

const REQUESTS = gql `
query user($id: ID!) {
  user(id: $id){
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


const PendingRequests = () => {

  const currentUser : any = window.localStorage.getItem("currentUser")
  const [ user, setUser ] = useState(JSON.parse(currentUser))
  const { loading, error, data: requests, refetch } = useQuery(REQUESTS, {
    variables: {
      id: user.id
    }
  })

  const [ pendingRequests, setPendingRequests ] = useState([])
  const [ changeToAvailable ] = useMutation(CHANGE_TO_AVAILABLE)
  const [ changeToUnavailable ] = useMutation(CHANGE_TO_UNAVAILABLE)

  useEffect(() => {
    if(requests) {
      setPendingRequests(requests.user.pendingRequested)
    }
  }, [requests?.user.pendingRequested])

  useEffect(() => {
    refetch()
  }, [user])


  const denyRequest = (bookId: string, borrowerId: string) => {
    changeToAvailable({
      variables: {
          userId: parseInt(user.id),
          bookId: parseInt(bookId),
          borrowerId: parseInt(borrowerId),
          status: 0
      }
    })
    refetch()
  }

  const acceptRequest = (bookId: string, borrowerId: string) => {
    changeToUnavailable({
      variables: {
        userId: parseInt(user.id),
        bookId: parseInt(bookId),
        borrowerId: parseInt(borrowerId),
        status: 2
      }
    })
    refetch()
  }

  useEffect(() => {
    refetch()
  }, [changeToAvailable, changeToUnavailable])

  const getRequests = () => {
    if(requests) {
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
        currentUser={user}
        denyRequest={denyRequest}
        acceptRequest={acceptRequest}
      />
      })
    }
  }

  const errorMessaging = () => {
    if(!loading && error) {
      return <h3>Oops, something went wrong</h3> //this should be replaced with the 500 
    } else if (loading && !error) {
      return <h3>loading...</h3>
    } else if (!loading && !error && pendingRequests.length === 0) {
      return <h3>No pending requests at this time</h3>
    }
  }

  return(
      <div className="pending-requests">
        {getRequests()}
        {errorMessaging()}
      </div>
  )
}

export default PendingRequests