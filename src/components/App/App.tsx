import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard'
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
  return (
    <div>
      {location.pathname !== '/' && <Navbar />}
      <Routes>
      <Route path='/' element={<Login/>}/>
        <Route path='/details' />
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/add-book'/>
      </Routes>
    </div>
  );
}
export default App;