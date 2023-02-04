import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from '../Login/Login';

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
      {location.pathname !== '/' && <h1>Header</h1>}
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home'/>
        <Route path='/details' />
        <Route path='/myaccount' />
        <Route path='/add-book' />
      </Routes>
    </div>
  );
}

export default App;