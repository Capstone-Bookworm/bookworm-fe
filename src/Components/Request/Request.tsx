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

  return (
    <div className="book-request">
      <img src={props.imageUrl}/>
      <div className="request-info">
      <h3>{props.borrower} requested to borrow {props.title}</h3>
      <h4>Location: {props.borrowerLocation}</h4>
      <h5>Contact Info: {props.borrowerEmailAddress}</h5>
        <button className="accept-request-btn" id="accept" onClick={() => props.acceptRequest(props.id, props.borrowerId)}>Accept</button>
        <button className="deny-request-btn" id="deny" onClick={() => props.denyRequest(props.id, props.borrowerId)}>Deny</button>
      </div>
    </div>
  )
}

export default Request