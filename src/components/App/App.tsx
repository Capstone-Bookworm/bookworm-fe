import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
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
  return (
    <div>
      {location.pathname !== '/' && <Navbar />}
      <Routes>
      <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home />} />
        <Route path='/details/:id' element={<BookDetails />}/>
        <Route path='/mydashboard' />
        <Route path='/add-book' />
      </Routes>
    </div>
  );
}
export default App;