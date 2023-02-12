import React from "react";
import { GrAlert } from 'react-icons/Gr'
import { Link } from 'react-router-dom'
import './ServerError.css'

const ServerError = () => {
  return (
    <div className="overlay">
      <div className="error-modal">
        <GrAlert className="error-icon"/>
        <h2>Oops! Something went wrong!</h2>
        <p>Please try again later</p>
        <Link to='/'><button className="dismiss-button">Return Home</button></Link>
      </div>
    </div>
  );
}

export default ServerError