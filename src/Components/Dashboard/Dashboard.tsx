import React, { useEffect } from "react";
import { useQuery, gql } from '@apollo/client'
import { NavLink } from "react-router-dom";


  const GET_BOOKS = gql `
    query {
      books {
        id
        imageUrl
    }
  }
  `

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_BOOKS)

  console.log("This is supposed to be book data in Dashboard.tsx", data)

  return (
    <div>
      <NavLink to='/dashboard/mybooks'><button>My Books</button></NavLink>
      <NavLink to='/dashboard/my-borrowed-books'><button>My borrowed books</button></NavLink>
      <NavLink to='/dashboard/add-book'><button>Add a book</button></NavLink>
    </div>
  )
}


export default Dashboard