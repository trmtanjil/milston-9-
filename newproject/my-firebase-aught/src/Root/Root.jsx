import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router'

function Root() {
  return (
   <>
    <Header></Header>
    <Outlet></Outlet>
   </>
  )
}

export default Root