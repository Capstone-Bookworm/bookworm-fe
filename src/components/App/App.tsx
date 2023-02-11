import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import DashboardMenu from '../DashboardMenu/DashboardMenu'
import { useQuery, gql } from '@apollo/client';
import PendingRequests from '../PendingRequests/PendingRequests';
import Home from '../Home/Home';
import BookDetails from '../BookDetails/BookDetails';
import MyBooks from '../MyBooks/MyBooks';
import BorrowedBooks from '../BorrowedBooks/BorrowedBooks';
import { User } from '../../Interfaces'
import AddBook from '../AddBook/AddBook';


interface Location {
  pathname: string,
  search: string,
  hash: string,
  state: null,
  key: string
}


function App() {
  let location: Location = useLocation()
  // const navigate = useNavigate()

  const [ currentUser, setCurrentUser ] = useState(localStorage.currentUser)

  const handleSetUser = (user:any) => {
    localStorage.setItem('currentUser', JSON.stringify(user.userLogin))
    let newObject: any = window.localStorage.getItem("currentUser")
    let newUser = JSON.parse(newObject)
    setCurrentUser(newUser)
  }

  
  
  // useEffect(() => {
  //   navigate('/home')
  // }, [currentUser])

  const getDashboardDisplay = () => {
    if(location.pathname === '/dashboard/my-borrowed-books' || location.pathname === '/dashboard' || location.pathname === '/dashboard/add-book' || location.pathname === '/dashboard/pending-requests') {
      return <DashboardMenu />
    }
  }

  return (
    <div>
      {location.pathname !== '/' && <Navbar />}
      {getDashboardDisplay()}
      <Routes>
        <Route path='/' element={<Login handleSetUser={handleSetUser}/>}/>
        <Route path='/dashboard' element={<MyBooks currentUser={currentUser}/>}/>
        <Route path='/dashboard/my-borrowed-books' element={< BorrowedBooks currentUser={currentUser}/>}/>
        <Route path='/dashboard/pending-requests' element={<PendingRequests currentUser={currentUser!}/>}/>
        <Route path='/dashboard/add-book' element={<AddBook/>}/>
        <Route path='/home' element={<Home />} />
        <Route path='/details/:id' element={<BookDetails key={location.key} currentUser={currentUser}/>}/>
      </Routes>
    </div>
  );
}
export default App;
