import React from 'react'
import { useQuery, gql } from '@apollo/client'

interface currentUser {
  userName?: string 
  location?: string
  id?: string
  emailAddress?: string;
  __typename?: string; 
}


const BorrowedBooks: React.FC<currentUser | any> = (props) => {
  console.log('PROPS', props)
  return (
    <div>This is my borrowed book section.</div>
  )
}

export default BorrowedBooks