import React from "react";
import './Request.css'
import { RequestProps } from "../../Interfaces";

const Request = (props : RequestProps) => {
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