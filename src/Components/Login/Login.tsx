import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

interface User {
  userName: string,
  emailAddress: string,
  location: string
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [userLocation, setUserLocation] = useState('')
  const [activeAccount, setAccount] = useState(true)
  const [allUsers, setUsers] = useState([{userName: "Josh", emailAddress: "test", location: "Denver"}])

  // useEffect(() => {
  //   const ALL_USERS = gql `
  //   query AllUsers {
  //     users {
  //       userName
  //       emailAddress
  //       location
  //     }
  //   }
  //   `
  // }, [])

  const verifyLogin = () => {
     let noUser = allUsers.map(user => {
      if(user.emailAddress !== email){
        setAccount(false)
      } else {
        setAccount(true)
      }
      
     })
     return noUser
  }

  const createUser = () => {
    let newUser = {userName: username, emailAddress: email, location: userLocation}

    console.log(newUser);
  
  }

  return (
    <section className='login-page'>
      <h1>Welcome to Book Worm</h1>
      <div className='login-container'>
        <h2>Login/ Create Account</h2>
        {activeAccount === false && <p>Could not find account please create a new one</p>}
        <input 
          type='email'
          className='email-login' 
          placeholder='Email'
          required
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <input 
          type='text'
          className='username-login' 
          placeholder='Username'
          required
          value={username}
          onChange={event => setUsername(event.target.value)}
          />
        {activeAccount === false && <input 
          type='text'
          className='location-login' 
          placeholder='Location (City, State)'
          required
          value={userLocation}
          onChange={event => setUserLocation(event.target.value)}
          />}
        {/* <Link to={'/home'}> */}
         {activeAccount === true && <button className='login-btn' onClick={verifyLogin}>Login</button>}
         {activeAccount === false && <button className='login-btn' onClick={createUser}>Create Account</button>}
        {/* </Link> */}
      </div>
    </section>
  )
}

export default Login;