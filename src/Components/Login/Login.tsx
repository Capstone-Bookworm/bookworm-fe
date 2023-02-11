import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useQuery, useMutation, gql } from '@apollo/client'

const GET_USER = gql `
  query userLogin($emailAddress: String!) {
    userLogin(emailAddress: $emailAddress) {
      userName
      location
      emailAddress
      id
  }
  }
`

const CREATE_USER = gql `
  mutation createUser ($userName: String!, $emailAddress: String!, $location: String!) {
    createUser(input: {
      userName: $userName
      emailAddress: $emailAddress
      location: $location
  }) { user {
          id
          userName
          emailAddress
          location
          }
     }
  }
`

const Login = ( { handleSetUser }: { handleSetUser: (user: any) => void}) => {
  const [ email, setEmail] = useState('')
  const [ login, setLogin ] = useState('')
  const [ activeAccount, setAccount] = useState(true)
  const [ username, setUsername ] = useState('')
  const [ userLocation, setUserLocation ] = useState('')
  const [ accountToCreate, setAccountToCreate ] = useState('')

  const userQuery = useQuery(GET_USER, {
    variables: { emailAddress: login }
  })

  const [ createAccount ] = useMutation(CREATE_USER)

  const handleSubmit = (event:any) => {
    event.preventDefault()
    if(activeAccount) {
      setLogin(email)
    } else {
      handleNewAccount()
    }
  }

  useEffect(() => {
    if(userQuery.data) {
      handleSetUser(userQuery.data)
      console.log(userQuery.data)
    }
  }, [userQuery.data])


  const handleNewAccount = () => {
    if (username && email && userLocation) {
      createAccount({
        variables: {
          userName: username,
          emailAddress: email,
          location: userLocation,
        }
      })
      setAccount(true)
    }
  }

  const getError = () => {
    if(!login && userQuery.error) {
      return false
    } else if (login && userQuery.error) {
      return true
    } else {
      return false
    }
  }

  return ( 
    <main> 
      <section className='login-page'>
        <div className='login-container'>
        <h1 className='page-title'>Book Worm</h1>
        {getError() && <h3>We couldn't find your account, please try again</h3>}
        <form className='create-acct-form' onSubmit={event => handleSubmit(event)}>
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
          {activeAccount === true && <input type="submit" value="Submit" className='login-btn' />}
          {activeAccount === false && <input type="submit" value="Submit" className='create-account-btn' />}
        </form>
        </div>
        <div className='create-acct'>
          {activeAccount === true && <h3>Don't have an account? </h3>}
          {activeAccount === true && <button className='login-btn' onClick={() => setAccount(false)}>Create New Account</button>}
          {activeAccount === false && <button className='login-btn' onClick={() => setAccount(true)}>Return to Login</button>}
        </div>
      </section>
    </main>
  )
}

export default Login;