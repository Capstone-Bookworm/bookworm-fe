import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  const verifyLogin = () => {
  }

  return (
    <section className='login-page'>
      <h1>Welcome to Book Worm</h1>
      <div className='login-container'>
        <h2>Login/ Create Account</h2>
        <input 
          className='email-login' 
          placeholder='Email'
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <input 
          className='username-login' 
          placeholder='Username'
          value={username}
          onChange={event => setUsername(event.target.value)}
          />
        <Link to={'/home'}>
         <button className='login-btn' onClick={verifyLogin}>Login</button>
        </Link>
      </div>
    </section>
  )
}

export default Login;