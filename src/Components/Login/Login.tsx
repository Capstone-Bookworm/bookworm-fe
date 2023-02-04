import { useState } from 'react'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  const verifyLogin = () => {
    console.log(email);
    console.log(username);
    
  }

  return (
    <section className='login-page'>
      <h1>BookWorm</h1>
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
        <button className='login-btn' onClick={verifyLogin}>Login</button>
      </div>
    </section>
  )
}

export default Login;