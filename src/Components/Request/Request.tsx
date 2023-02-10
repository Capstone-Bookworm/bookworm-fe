import React from "react";
import './Request.css'
import { User } from "../../Interfaces";

interface Props {
  id: number;
  title: string;
  imageUrl: string;
  borrower: string;
  borrowerId: number;
  borrowerLocation: string;
  borrowerEmailAddress: string;
  currentUser: User,
  denyRequest: (bookId: number, borrowerId: number, status: number) => void;
  acceptRequest: (bookId: number, borrowerId: number, status: number) => void
}


const Request = (props : Props) => {

const handleRequestResponse = (event: any) => {
  if (event.target.id === "accept") {
    props.acceptRequest(props.id, props.borrowerId, 2)
  } else if (event.target.id === "deny") {
    props.denyRequest(props.id, props.borrowerId, 0)
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