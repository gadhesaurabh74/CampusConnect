import React from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
     {/* Add your layout components here */}
     <Navbar/>
     <div>
      <Outlet/>
     </div>
     
    </>
  )
}

export default RootLayout
