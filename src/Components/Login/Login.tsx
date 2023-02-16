import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useLazyQuery, useMutation, gql } from '@apollo/client'
import { currentUser, User } from '../../Interfaces'

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

const Login = ( { handleSetUser }: { handleSetUser: (user: currentUser) => void}) => {
  const [ email, setEmail] = useState('')
  const [ login, setLogin ] = useState('')
  const [ activeAccount, setActiveAccount] = useState(true)
  const [ username, setUsername ] = useState('')
  const [ userLocation, setUserLocation ] = useState('')
  const [ errorMessage, setMessage ] = useState("We couldn't find your account, please try again")
  const [ accountError, setAccountError ] = useState(false)
  const navigate = useNavigate()

  const [userQuery, { loading, error, data }] = useLazyQuery(GET_USER, {
    variables: { emailAddress: login }
  })

  const [ createAccount ] = useMutation(CREATE_USER)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(activeAccount) {
      setLogin(email)
      userQuery()
    } else {
      handleNewAccount()
    }
  }

  const getError = () => {
    if(!login && error) {
      return false
    } else if (login && error) {
      setTimeout(() => setMessage(""), 3000)
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    if(data) {
      handleSetUser(data)
    }
    if(!getError() && data) {
      navigate('/home')
    }
  }, [data])


  const handleNewAccount = async () => {
    if (username && email && userLocation) {
      try {
        const result = await createAccount({
        variables: {
          userName: username,
          emailAddress: email,
          location: userLocation,
        }
      })
      if (result.data) {
        setActiveAccount(true)
        setAccountError(false)
      }
    }
    catch (error) {
      setAccountError(true)
    }
  }
  }

  const handleChange = () => {
    if(activeAccount) {
      setActiveAccount(false)
      setEmail('')
    } else {
      setActiveAccount(true)
      setEmail('')
    }
  }

  return ( 
    <main> 
      <section className='login-page'>
        <div className='login-container'>
        <h1 className='page-title'>Book Worm</h1>
        {getError() && <h3>{errorMessage}</h3>}
        {accountError && <h3 className='account-error'>That username already exists please choose another one</h3>}
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
          {activeAccount === true && <p className='create-acct-msg'>Don't have an account? </p>}
          {activeAccount === true && <button className='login-btn' onClick={handleChange}>Create New Account</button>}
          {activeAccount === false && <button className='login-btn' onClick={handleChange}>Return to Login</button>}
        </div>
      </section>
    </main>
  )
}

export default Login;