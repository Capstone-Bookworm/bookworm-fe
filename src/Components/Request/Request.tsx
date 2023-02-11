import React from "react";
import './Request.css'
import { User } from "../../Interfaces";

interface Props {
  id: string;
  title: string;
  imageUrl: string;
  borrower: string;
  borrowerId: string;
  borrowerLocation: string;
  borrowerEmailAddress: string;
  currentUser: User,
  denyRequest: (bookId: string, borrowerId: string) => void;
  acceptRequest: (bookId: string, borrowerId: string) => void
}


const Request = (props : Props) => {

const handleRequestResponse = (event: any) => {
  if (event.target.id === "accept") {
    console.log('Event: ', event.target.id)
    console.log('accept')
    props.acceptRequest(props.id, props.borrowerId)
  } else if (event.target.id === "deny") {
    console.log('Event: ', event.target.id)
    console.log('deny')
    props.denyRequest(props.id, props.borrowerId)
  }
}

  return (
    <div className="book-request">
      <img src={props.imageUrl}/>
      <div className="request-info">
      <h3>{props.borrower} requested to borrow {props.title}</h3>
        <button className="accept-request-btn" id="accept" onClick={event => handleRequestResponse(event)}>Accept</button>
        <button className="deny-request-btn" id="deny" onClick={event => handleRequestResponse(event)}>Deny</button>
      </div>
    </div>
  )
}

export default Request