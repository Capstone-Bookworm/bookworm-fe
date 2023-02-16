import React, { useState } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import DashboardMenu from '../DashboardMenu/DashboardMenu'
import PendingRequests from '../PendingRequests/PendingRequests';
import Home from '../Home/Home';
import BookDetails from '../BookDetails/BookDetails';
import MyBooks from '../MyBooks/MyBooks';
import BorrowedBooks from '../BorrowedBooks/BorrowedBooks';
import { currentUser, User, Location } from '../../Interfaces'
import AddBook from '../AddBook/AddBook';
import { PageNotFound } from '../PageNotFound/PageNotFound';

function App() {
  let location: Location = useLocation()
  const [ currentUser, setCurrentUser ] = useState(localStorage.currentUser)

  const handleSetUser = (user: currentUser) => {
    localStorage.setItem('currentUser', JSON.stringify(user.userLogin))
    let newObject: string | null = window.localStorage.getItem("currentUser")
    if(typeof newObject === 'string') {
      let newUser: string | User = JSON.parse(newObject)
      setCurrentUser(newUser)
    }
  }

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
        <Route path='/dashboard' element={<MyBooks />}/>
        <Route path='/dashboard/my-borrowed-books' element={< BorrowedBooks />}/>
        <Route path='/dashboard/pending-requests' element={<PendingRequests />}/>
        <Route path='/dashboard/add-book' element={<AddBook/>}/>
        <Route path='/home' element={<Home />} />
        <Route path='/details/:id' element={<BookDetails key={location.key}/>}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
export default App;
