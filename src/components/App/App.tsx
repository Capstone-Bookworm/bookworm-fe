import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';


interface Location {
  pathname: string,
  search: string,
  hash: string,
  state: null,
  key: string
}

interface User {
  userName: string;
  location: string;
  emailAddress: string;
  __typename: string;
}

function App() {
  let location: Location = useLocation()
  const navigate = useNavigate()

  const [ currentUser, setCurrentUser ] = useState([])

  const handleSetUser = (user:any) => {
    setCurrentUser(user)
  }

  useEffect(() => {
    navigate('/home')
  }, [currentUser])


  return (
    <div>
      {location.pathname !== '/' && <Navbar />}
      <Routes>
      <Route path='/' element={<Login handleSetUser={handleSetUser}/>}/>
        <Route path='/details' />
        <Route path='/myaccount' />
        <Route path='/add-book' />
      </Routes>
    </div>
  );
}
export default App;