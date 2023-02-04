import React from 'react'
import './Login.css'

const Login = () => {

  const verifyLogin = () => {
    console.log('hello');
  }

  return (
    <section className='login-page'>
      <h1>BookWorm</h1>
      <div className='login-container'>
        <input 
          className='email-login' 
          placeholder='Email'
          value={'Email'}
        />
        <input className='username-login' placeholder='Username'></input>
        <button className='login-btn' onClick={event => verifyLogin()}>Login</button>
      </div>
    </section>
  )
}

export default Login;