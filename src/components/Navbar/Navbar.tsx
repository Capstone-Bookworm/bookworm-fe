import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return(
    <header className='navbar'>
      <section className='header'>
        <img src='#' alt='Logo' className='logo'/>
        <h1 className='title'>Bookworm</h1>
      </section>
      <br />
      <nav>
        <ul className='buttons'>
          <li><NavLink to='/home'><button>Home</button></NavLink></li>
          <li><NavLink to='/myaccount'><button>My Account</button></NavLink></li>
          <li><NavLink to='/'><button>Logout</button></NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
