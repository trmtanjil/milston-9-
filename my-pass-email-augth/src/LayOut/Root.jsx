import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router'

function Root() {
  return (
   <>
   <Navbar></Navbar>
   <Outlet></Outlet>
   </>
  )
}

export default Root