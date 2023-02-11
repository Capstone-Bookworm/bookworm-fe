import React, { useState, useEffect } from "react";
import { gql, useLazyQuery, useMutation } from '@apollo/client'
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


const PendingRequests = ({ currentUser }: { currentUser: User | any}) => {

  
  const [ user, setUser ] = useState(currentUser || JSON.parse(currentUser))
  const [getAllRequests, { loading, error, data: requests }] = useLazyQuery(REQUESTS, {
    variables: {
      id: user.id
    }
  })
  
  useEffect(() => {
    if(currentUser.userName) {
      setUser(currentUser)
      console.log(currentUser)
    } else if (!currentUser.userName) {
      setUser(JSON.parse(currentUser))
      console.log(JSON.parse(currentUser))
    }
    
  }, [])


//needs error handling for requests

const [ pendingRequests, setPendingRequests ] = useState([])
const [ changeToAvailable ] = useMutation(CHANGE_TO_AVAILABLE)
const [ changeToUnavailable ] = useMutation(CHANGE_TO_UNAVAILABLE)

useEffect(() => {
  console.log(requests)
  if(requests) {
    setPendingRequests(requests?.user.pendingRequested)
  }
}, [requests?.user.pendingRequested])

useEffect(() => {
  console.log("in useEffect", user)
  getAllRequests()
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
  getAllRequests()
}

const acceptRequest = (bookId: string, borrowerId: string) => {
  console.log("this should work")
  changeToUnavailable({
    variables: {
      userId: parseInt(user.id),
      bookId: parseInt(bookId),
      borrowerId: parseInt(borrowerId),
      status: 2
    }
  })
  getAllRequests()
}


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

  return(
    <div>
      <div className="pending-requests">
      {getRequests()}
      </div>
      {/* <button onClick={() => {getAllRequests()}}>ClickMe</button> */}
      </div>
  )
}

export default PendingRequests