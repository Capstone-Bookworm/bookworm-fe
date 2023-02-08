import React from "react";

interface borrower {
  id: number;
  title: string;
  borrower: string;
  borrowerId: number;
  borrowerLocation: string;
  borrowerEmailAddress: string
}


const Request = ({ id, title, borrower, borrowerId, borrowerLocation, borrowerEmailAddress} : borrower) => {
  return (
    <div>
      <h2>Requests here</h2>
    </div>
  )
}

export default Request