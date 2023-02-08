import React from "react";
import { NavLink } from "react-router-dom";

const DashboardMenu = () => {
  return(
    <div>
      <NavLink to='/dashboard'><button>My Books</button></NavLink>
      <NavLink to='/dashboard/my-borrowed-books'><button>My borrowed books</button></NavLink>
      <NavLink to='/dashboard/add-book'><button>Add a book</button></NavLink>
    </div>
  )
}

export default DashboardMenu