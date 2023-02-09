import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useQuery, gql } from '@apollo/client'
import { verify } from 'crypto'

// const ALL_USERS = gql `
//   query AllUsers {
//     users {
//       userName
//       emailAddress
//       location
//     }
//   }
// `

const GET_USER = gql `
  query userLogin($emailAddress: String!) {
    userLogin(emailAddress: $emailAddress) {
      userName
      location
      emailAddress
  }
  }
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [ login, setLogin ] = useState('')
  const [user, setUser] = useState('')
  const [activeAccount, setAccount] = useState(true)
  // const [errorMessage, setErrorMessage] = useState('')
  // const [ error, setError ] = useState(false)

  let navigate = useNavigate()

  const {loading, error, data } = useQuery(GET_USER, {
    variables: { emailAddress: login }
  })

  const handleSubmit = (event:any) => {
    event.preventDefault()
    setLogin(email)
  }

  useEffect(() => {
    if(data) {
      // setUser(userQuery.data)
      // setError(false)
      console.log(data)
    }
  }, [data])
  
  // useEffect(() => {
  //   if(userQuery.error) {
  //       setError(true)
  //   }
  // }, [error])

  // const verifyLogin = () => {
  //   setUsername('joshua@gmail.com')
  // }


  // const verifyLogin = () => {
  //    let noUser = allUsers.map(user => {
  //     if(user.emailAddress !== email){
  //       setLoginError(true)
  //       setErrorMessage("Could not find that email please try again")
  //       setEmail('')
  //     } else {
  //       setAccount(true)
  //       navigate("/home")      
  //     }
  //   }) 
  //     return noUser
  // }

  // const createUser = () => {
  //   if(username === '') {
  //     setLoginError(true)
  //     setErrorMessage("Please fill in a username")
  //   }
  //   if(email === '') {
  //     setLoginError(true)
  //     setErrorMessage("Please fill in an email")
  //   }
  //   if(userLocation === '') {
  //     setLoginError(true)
  //     setErrorMessage("Please fill in a location")
  //     console.log("Email: ", email, "Username: ", username);
      
  //   } else {
  //     let newUser = {userName: username, emailAddress: email, location: userLocation}
  //     setEmail('')
  //     setUsername('')
  //     setUserLocation('')
  //     navigate("/home")
  //   } 
  // }

  const getError = () => {
    if(!login && error) {
      return false
    } else if (login && error) {
      return true
    } else {
      return false
    }
  }

  return (
    <section className='login-page'>
      <div className='login-container'>
      <h1 className='page-title'>Book Worm</h1>
      {getError() && <h3>We couldn't find your account, please try again</h3>}
      <form onSubmit={event => handleSubmit(event)}>
        <input 
          type='email'
          className='email-login' 
          placeholder='Email'
          required
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        {/* {activeAccount === false &&
        <input 
          type='text'
          className='username-login' 
          placeholder='Username'
          required
          value={username}
          onChange={event => setUsername(event.target.value)}
          />} */}
        {/* {activeAccount === false && 
        <input 
          type='text'
          className='location-login' 
          placeholder='Location (City, State)'
          required
          value={userLocation}
          onChange={event => setUserLocation(event.target.value)}
          />} */}
         {activeAccount === true && <input type="submit" value="Submit" className='login-btn' />}
         {/* {activeAccount === false && <button className='login-btn' onClick={createUser}>Create Account</button>} */}
      </form>
      </div>
      {/* <div className='create-acct'>
        {activeAccount === true && <h3>Don't have an account? </h3>}
        {activeAccount === true && <button className='login-btn' onClick={() => setAccount(false)}>Create New Account</button>}
        {activeAccount === false && <button className='login-btn' onClick={() => setAccount(true)}>Return to Login</button>}
      </div> */}
    </section>
  )
}

export default Login;