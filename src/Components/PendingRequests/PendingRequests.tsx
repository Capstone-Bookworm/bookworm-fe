import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from '@apollo/client'
import Request from "../Request/Request";
import { User, SpecificRequest } from '../../Interfaces'
import ServerError from "../ServerError/ServerError";

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
  const currentUser: string = window.localStorage.getItem("currentUser")!
  const [ user, setUser ] = useState<User>(JSON.parse(currentUser))
  const { loading, error, data: requests, refetch } = useQuery(REQUESTS, {
    variables: {
      id: user.id
    }
  })

  const getCachedRequests = useQuery(REQUESTS, {
    fetchPolicy: 'cache-only'
  })

  const [ pendingRequests, setPendingRequests ] = useState([])
  const [ flag, setFlag ] = useState(true)
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

  const denyRequest = async (bookId: string, borrowerId: string) => {
    try {
      const result = await changeToAvailable({
        variables: {
          userId: parseInt(user.id),
          bookId: parseInt(bookId),
          borrowerId: parseInt(borrowerId),
          status: 0
        } 
        })
      if (result.data) {
        refetch()
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const acceptRequest = async (bookId: string, borrowerId: string) => {
   try {
     const result = await changeToUnavailable({
        variables: {
          userId: parseInt(user.id),
          bookId: parseInt(bookId),
          borrowerId: parseInt(borrowerId),
          status: 2
        }
      })
      if(result.data) {
        refetch()
      }
   } 
   catch (error) {
    console.log(error)  
    }
  }

  const getRequests = () => {
    if(requests) {
      return pendingRequests.map((request: SpecificRequest, index: number, array: SpecificRequest[]) => {
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
     if (loading && !error) {
      return <h3>loading...</h3>
    } else if (!loading && !error && pendingRequests.length === 0) {
      return <h3>No pending requests at this time</h3>
    }
  }

  return(
      <div className="pending-requests">
        {error && <ServerError />}
        {getRequests()}
        {errorMessaging()}
      </div>
  )
}

export default PendingRequests