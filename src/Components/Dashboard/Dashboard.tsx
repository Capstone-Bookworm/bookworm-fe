import React, { useEffect } from "react";
import { useQuery, gql } from '@apollo/client'
import { NavLink } from "react-router-dom";
import DashboardMenu from '../DashboardMenu/DashboardMenu'
import MyBooks from '../MyBooks/MyBooks'


const Dashboard = () => {

  return (
    <div>
      <DashboardMenu />
      <MyBooks />
    </div>
  )
}


export default Dashboard