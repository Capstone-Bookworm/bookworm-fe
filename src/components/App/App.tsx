import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';

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
      <Routes>
        <Route path='/'/>
        <Route path='/home' element={<Home />}/>
        <Route path='/details' />
        <Route path='/myaccount' />
        <Route path='/add-book' />
      </Routes>
    </div>
  );
}

export default App;