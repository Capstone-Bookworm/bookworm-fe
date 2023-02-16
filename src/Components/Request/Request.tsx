import React from "react";
import './Request.css'
import { RequestProps } from "../../Interfaces";

const Request: React.FC<RequestProps> = (props) => {
  return (
    <div className="book-request">
      <img className="pending-book-img" src={props.imageUrl}/>
      <div className="request-info">
        <h3 className="request-desc">{props.borrower} requested to borrow {props.title}</h3>
        <h4 className="request-desc info">Location: {props.borrowerLocation}</h4>
        <h5 className="request-desc info">Contact Info: {props.borrowerEmailAddress}</h5>
        <div className="pending-btn-container">
          <button className="accept-request-btn" id="accept" onClick={() => props.acceptRequest(props.id, props.borrowerId)}>Accept</button>
          <button className="deny-request-btn" id="deny" onClick={() => props.denyRequest(props.id, props.borrowerId)}>Deny</button>
        </div>
      </div>
    </div>
  )
}

export default Request