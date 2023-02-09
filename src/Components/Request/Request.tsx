import React from "react";
import './Request.css'

interface borrower {
  id: number;
  title: string;
  imageUrl: string;
  borrower: string;
  borrowerId: number;
  borrowerLocation: string;
  borrowerEmailAddress: string
}


const Request = ({ id, title, borrower, imageUrl, borrowerId, borrowerLocation, borrowerEmailAddress} : borrower) => {
  return (
    <div className="book-request">
      <img src={imageUrl}/>
      <div className="request-info">
      <h3>{borrower} requested to borrow {title}</h3>
        <button className="accept-request-btn">Accept</button>
        <button className="deny-request-btn">Deny</button>
      </div>
    </div>
  )
}

export default Request