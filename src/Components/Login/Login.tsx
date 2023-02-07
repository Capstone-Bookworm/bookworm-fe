import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useQuery, gql } from '@apollo/client'

interface User {
  userName: string,
  emailAddress: string,
  location: string
}

// const USER_LOOKUP = gql `
//   query UserLookup ($id: ID!) {
//   user (id: $id) {
//     id
//     userName
//     emailAddress
//     location
//     availableBooks {
//       id
//     }
//   }
// }`

// const GET_BOOK = gql`
//   query GetBook {
//     book(id: 1) {
//       title
//   }
// `


// const ALL_USERS = gql `
//   query AllUsers {
//     users (limit: 2) {
//       userName
//       emailAddress
//       location
//     }
//   }
// `

// const ALL_BOOKS = gql `
//   query AllBooks {
//     books {
//       id
//       imageUrl
//     }
//   }
// `

const Login = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [userLocation, setUserLocation] = useState('')
  const [activeAccount, setAccount] = useState(true)
  const [allUsers, setUsers] = useState([{userName: "Josh", emailAddress: "test", location: "Denver"}])

  let navigate = useNavigate()

  // const { data, loading, error, client } = useQuery(ALL_USERS , {
  //   fetchPolicy: "no-cache" 
  // });
  // const { data, loading, error } = useQuery(ALL_BOOKS)
  // const { data, loading, error } = useQuery(GET_BOOK)
  // console.log("Endpoint BEFORE", data)
  // client.resetStore()
  // console.log("Endpoint", data)
  // console.log('hey what are you', useQuery(USER_LOOKUP))

  const verifyLogin = () => {
     let noUser = allUsers.map(user => {
      if(user.emailAddress !== email){
        setAccount(false)
      } else {
        setAccount(true)
        navigate("/home")      
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
         {activeAccount === true && <button className='login-btn' onClick={verifyLogin}>Login</button>}
         {activeAccount === false && <button className='login-btn' onClick={createUser}>Create Account</button>}
      </div>
    </section>
  )
}

export default Login;