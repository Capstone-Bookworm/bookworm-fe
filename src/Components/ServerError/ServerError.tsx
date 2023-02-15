import React from "react";
import { GrAlert } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import './ServerError.css'
import { message } from '../../Interfaces'

const ServerError: React.FC<message> = ({ message }) => {
  return (
    <div className="overlay">
      <div className="error-modal">
        <GrAlert className="error-icon"/>
        <h2>Oops! Something went wrong!</h2>
        <p>{message || "Please try again later"}</p>
        <Link to='/home'><button className="dismiss-button">Return Home</button></Link>
      </div>
    </div>
  );
}

export default ServerError;