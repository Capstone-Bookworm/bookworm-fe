import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import './Dashboard.css'

const DashboardMenu = () => {
  return(
    <div className="user-dash-nav">
      <NavLink to='/dashboard'><button className="nav-button-mybooks">My Books</button></NavLink>
      <NavLink to='/dashboard/my-borrowed-books'><button className="nav-button-mybooks">My borrowed books</button></NavLink>
      <NavLink to='/dashboard/pending-requests'><button className="nav-button-mybooks">Pending Requests</button></NavLink>
      <NavLink to='/dashboard/add-book'><button className="nav-button-mybooks">Add a book</button></NavLink>
    </div>
  )
}

export default DashboardMenu