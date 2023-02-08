import React, { useEffect } from "react";
import { useQuery, gql } from '@apollo/client'
import { NavLink, useLocation, Routes, Route } from "react-router-dom";
import DashboardMenu from '../DashboardMenu/DashboardMenu'
import MyBooks from '../MyBooks/MyBooks'

interface Location {
  pathname: string,
  search: string,
  hash: string,
  state: null,
  key: string
}


const Dashboard = () => {
  let location: Location = useLocation()
  return (
    <div>
      <MyBooks />
    </div>
  )
}


export default Dashboard