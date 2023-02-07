import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard'


interface Location {
  pathname: string,
  search: string,
  hash: string,
  state: null,
  key: string
}
function App() {
  let location: Location = useLocation()
  return (
    <div>
      {location.pathname !== '/' && <Navbar />}
      {location.pathname === '/dashboard' && <Dashboard />}
      <Routes>
      <Route path='/' element={<Login/>}/>
        <Route path='/details' />
        <Route path='/dashboard/mybooks' />
        <Route path='/add-book' />
      </Routes>
    </div>
  );
}
export default App;