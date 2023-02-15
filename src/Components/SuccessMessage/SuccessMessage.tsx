import React from "react";
import { GiBookshelf } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import './SuccessMessage.css'

const SuccessMessage = () => {
  return (
    <div className="overlay">
      <div className="success-modal">
        <GiBookshelf className="success-icon"/>
        <h2>Your request is pending!</h2>
        <p>You'll hear from the lender soon!</p>
        <Link to='/home'><button className="to-home-button">Keep Browsing</button></Link>
      </div>
    </div>
  );
}

export default SuccessMessage