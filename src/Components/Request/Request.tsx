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

// const handleRequestResponse = (event: any) => {
//   if (event.target.id === "accept") {
//     console.log("fire off the accept!")
//     console.log(props.id, props.borrowerId)
//     props.acceptRequest(props.id, props.borrowerId)
//   } else if (event.target.id === "deny") {
//     console.log("fire off the deny!")
//     console.log(props.id, props.borrowerId)
//     props.denyRequest(props.id, props.borrowerId)
//   }
// }

  return (
    <div className="book-request">
      <img src={props.imageUrl}/>
      <div className="request-info">
      <h3>{props.borrower} requested to borrow {props.title}</h3>
        <button className="accept-request-btn" id="accept" onClick={() => props.acceptRequest(props.id, props.borrowerId)}>Accept</button>
        <button className="deny-request-btn" id="deny" onClick={() => props.denyRequest(props.id, props.borrowerId)}>Deny</button>
      </div>
    </div>
  )
}

export default Request