import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';

import Dashboard from '../Dashboard/Dashboard'
import DashboardMenu from '../DashboardMenu/DashboardMenu'
import { useQuery, gql } from '@apollo/client';
import PendingRequests from '../PendingRequests/PendingRequests';
import Home from '../Home/Home';
import BookDetails from '../BookDetails/BookDetails';


interface Location {
  pathname: string,
  search: string,
  hash: string,
  state: null,
  key: string
}


function App() {
  let location: Location = useLocation()

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
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/dashboard/my-borrowed-books'/>
        <Route path='/dashboard/add-book' />
        <Route path='/dashboard/pending-requests' element={<PendingRequests />}/>
        <Route path='/home' element={<Home />} />
        <Route path='/details/:id' element={<BookDetails key={location.key}/>}/>
      </Routes>
    </div>
  );
}
export default App;