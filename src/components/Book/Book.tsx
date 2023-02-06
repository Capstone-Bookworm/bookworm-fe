import React from 'react'

interface book {
    email: string,
    location: string,
    name: string
}

const Book: React.FC<book> = ({ name, email, location }): JSX.Element => {
  return (
    <div>
      <img src="#" alt="Book cover"/>
      <p>{name}, {email}, {location}</p>
    </div>
  )
}

export default Book