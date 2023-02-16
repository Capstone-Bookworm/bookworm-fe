import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './Dashboard.css'

const DashboardMenu = () => {
  const [active, setActive] = useState('1')
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setActive(event.currentTarget.id)
  }
  return(
    <div className="user-dash-nav">
      <NavLink to='/dashboard'><button id='1' className={active === '1' ? "nav-button-mybooks active" : "nav-button-mybooks"} onClick={(event) => handleClick(event)}>My Books</button></NavLink>
      <NavLink to='/dashboard/my-borrowed-books'><button id='2' className={active === '2' ? "nav-button-mybooks active" : "nav-button-mybooks"} onClick={(event) => handleClick(event)}>My borrowed books</button></NavLink>
      <NavLink to='/dashboard/pending-requests'><button id='3' className={active === '3' ? "nav-button-mybooks active" : "nav-button-mybooks"} onClick={(event) => handleClick(event)}>Pending Requests</button></NavLink>
      <NavLink to='/dashboard/add-book'><button id='4' className={active === '4' ? "nav-button-mybooks active" : "nav-button-mybooks"} onClick={(event) => handleClick(event)}>Add a book</button></NavLink>
    </div>
  )
}

export default DashboardMenu