import React from "react";
import { GrAlert } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import './ServerError.css'

interface Props {
  message?: string;
}

const ServerError = ({ message }: Props) => {
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