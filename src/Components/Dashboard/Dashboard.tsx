import React, { useEffect } from "react";
import { useQuery, gql } from '@apollo/client'


  const GET_BOOKS = gql `
    query AllBooks {
      books {
        id,
        imageUrl
    }
  }
  `

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_BOOKS, {
    fetchPolicy: "no-cache"
  })

  console.log(data)

  return (
    <div>

    </div>
  )
}


export default Dashboard