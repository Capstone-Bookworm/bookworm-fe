import React, { useState } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx"


const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false)
  const style = { fontSize: "2em", cursor: 'pointer' }

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
      <button onClick={handleClick}>{navbarOpen ? <RxCross2 style={style}/> : <RxHamburgerMenu style={style}/>}</button>
        <ul className={`menuNav ${navbarOpen ? "showMenu" : ""}`}>
          <NavLink to='/home'><li onClick={() => closeMenu()}>Home</li></NavLink>
          <NavLink to='/mydashboard'><li onClick={() => closeMenu()}>My Dashboard</li></NavLink>
          <NavLink to='/'><li onClick={() => closeMenu()}>Logout</li></NavLink>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
