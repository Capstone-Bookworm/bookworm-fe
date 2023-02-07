import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
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
  return (
    <div>
      {location.pathname !== '/' && <Navbar />}
      <Routes>
      <Route path='/' element={<Login/>}/>
        <Route path='/details' />
        <Route path='/myaccount' />
        <Route path='/add-book' element={<AddBook/>} />
      </Routes>
    </div>
  );
}
export default App;