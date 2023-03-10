import React, { useState } from 'react'
import './Navbar.css'
import { NavLink, useLocation } from 'react-router-dom'
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx"
import { User } from '../../Interfaces'

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false)
  const style = { fontSize: "2em", cursor: 'pointer' }
  const location = useLocation()
  const currentUser: string = window.localStorage.getItem("currentUser")!
  const [ user, setUser ] = useState<User>(JSON.parse(currentUser))

  const handleClick = () => {
    setNavbarOpen(!navbarOpen)
  }

  const closeMenu = () => {
      setNavbarOpen(false)
  }

  const logout = () => {
    setNavbarOpen(false)
    localStorage.clear()
  }

  return(
    <header className='navbar'>
      <div className='welcome-container'>
        <img src='https://cdn-icons-png.flaticon.com/512/2789/2789786.png' alt='Logo' className='logo' />
        <h2 className='welcome-display'>Welcome {user.userName}!</h2>
      </div>
      <div className='title-container'>
        <h1 className='title'>Bookworm</h1>
        <p className='subtitle'>Borrow books. Build community.</p>
      </div>
      <nav className='hamburger-menu-container'>
        <button onClick={handleClick}>{navbarOpen ? <RxCross2 style={style}/> : <RxHamburgerMenu style={style}/>}</button>
        <ul className={navbarOpen ? "showMenu menuNav" : "menuNav"}>
          {location.pathname === '/home' && <NavLink to='/dashboard'><li onClick={() => closeMenu()}>My Dashboard</li></NavLink>}
          {location.pathname !== '/home' && <NavLink to='/home'><li onClick={() => closeMenu()}>Home</li></NavLink>}
          <NavLink to='/'><li onClick={() => logout()}>Logout</li></NavLink>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
