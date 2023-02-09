import React, { useState, useEffect } from "react";
import { gql, useQuery } from '@apollo/client'
import Request from "../Request/Request";

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


const PendingRequests = () => {
const { loading, error, data } = useQuery(REQUESTS)
const [ pendingRequests, setPendingRequests ] = useState([])


useEffect(() => {
  if(data) {
    console.log(data.user.pendingRequested)
    setPendingRequests(data.user.pendingRequested)
  }
}, [data])

const getRequests = () => {
  if(data) {
    console.log(pendingRequests)
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