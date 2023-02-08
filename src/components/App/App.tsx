import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard'
import DashboardMenu from '../DashboardMenu/DashboardMenu'
import { useQuery, gql } from '@apollo/client';


interface Location {
  pathname: string,
  search: string,
  hash: string,
  state: null,
  key: string
}

const ALL_USERS = gql `
  query user {
    user(id:1) {
        id
        userName
        availableBooks {
          id
          title
          author
          imageUrl
        }
    }
  }
`

function App() {
  const {loading, error, data } = useQuery(ALL_USERS)
  // console.log(data)
  let location: Location = useLocation()

  const getDashboardDisplay = () => {
    if(location.pathname === '/dashboard/my-borrowed-books' || location.pathname === '/dashboard' || location.pathname === '/dashboard/add-book') {
      return <DashboardMenu />
    }
  }
  return (
    <div>
      {location.pathname !== '/' && <Navbar />}
      {getDashboardDisplay()}
      <Routes>
      <Route path='/' element={<Login/>}/>
        <Route path='/details' />
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/my-borrowed-books'/>
        <Route path='/add-book' />
      </Routes>
    </div>
  );
}
export default App;