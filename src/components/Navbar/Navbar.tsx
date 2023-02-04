import React, { useState } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx"


const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false)

  const handleClick = () => {
    setNavbarOpen(!navbarOpen)
  }

  const closeMenu = () => {
    setNavbarOpen(false)
  }

  return(
    <header className='navbar'>
      <section className='header'>
        <img src='#' alt='Logo' className='logo'/>
        <h1 className='title'>Bookworm</h1>
      </section>
      <nav>
      <button onClick={handleClick}>{navbarOpen ? <RxCross2 /> : <RxHamburgerMenu />}</button>
        <ul className={`menuNav ${navbarOpen ? "showMenu" : ""}`}>
          <NavLink to='/home'><li onClick={() => closeMenu()}>Home</li></NavLink>
          <NavLink to='/myaccount'><li onClick={() => closeMenu()}>My Account</li></NavLink>
          <NavLink to='/'><li onClick={() => closeMenu()}>Logout</li></NavLink>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
