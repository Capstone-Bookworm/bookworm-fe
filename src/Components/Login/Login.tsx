import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useQuery, gql } from '@apollo/client'

const ALL_USERS = gql `
  query AllUsers {
    users {
      userName
      emailAddress
      location
    }
  }
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [userLocation, setUserLocation] = useState('')
  const [activeAccount, setAccount] = useState(true)
  const [loginError, setLoginError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [allUsers, setUsers] = useState([{emailAddress: "joshua@gmail.com", userName: "Joshua", location: "Colorado"}])

  let navigate = useNavigate()

  const { data, loading, error } = useQuery(ALL_USERS)
  
  const verifyLogin = () => {
     let noUser = allUsers.map(user => {
      if(user.emailAddress !== email){
        setLoginError(true)
        setErrorMessage("Could not find that email please try again")
        setEmail('')
      } else {
        setAccount(true)
        navigate("/home")      
      }
    }) 
      return noUser
  }

  const createUser = () => {
    if(username === '') {
      setLoginError(true)
      setErrorMessage("Please fill in a username")
    }
    if(email === '') {
      setLoginError(true)
      setErrorMessage("Please fill in an email")
    }
    if(userLocation === '') {
      setLoginError(true)
      setErrorMessage("Please fill in a location")
      console.log("Email: ", email, "Username: ", username);
      
    } else {
      let newUser = {userName: username, emailAddress: email, location: userLocation}
      setEmail('')
      setUsername('')
      setUserLocation('')
      navigate("/home")
    } 
  }

  return (
    <section className='login-page'>
      <div className='login-container'>
      <h1 className='page-title'>Book Worm</h1>
      {loginError === true && <h3>{errorMessage}</h3>}
        <input 
          type='email'
          className='email-login' 
          placeholder='Email'
          required
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        {activeAccount === false &&
        <input 
          type='text'
          className='username-login' 
          placeholder='Username'
          required
          value={username}
          onChange={event => setUsername(event.target.value)}
          />}
        {activeAccount === false && 
        <input 
          type='text'
          className='location-login' 
          placeholder='Location (City, State)'
          required
          value={userLocation}
          onChange={event => setUserLocation(event.target.value)}
          />}
         {activeAccount === true && <button className='login-btn' onClick={verifyLogin}>Login</button>}
         {activeAccount === false && <button className='login-btn' onClick={createUser}>Create Account</button>}
      </div>
      <div className='create-acct'>
        {activeAccount === true && <h3>Don't have an account? </h3>}
        {activeAccount === true && <button className='login-btn' onClick={() => setAccount(false)}>Create New Account</button>}
        {activeAccount === false && <button className='login-btn' onClick={() => setAccount(true)}>Return to Login</button>}
      </div>
    </section>
  )
}

export default Login;