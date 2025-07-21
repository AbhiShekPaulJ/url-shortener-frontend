import React from 'react'
import HomePage from './pages/HomePage'
import LoginForm from './components/LoginForm'
import AuthPage from './pages/AuthPage'
import { Outlet } from '@tanstack/react-router'
import Navbar from './components/NavBar'

const RootLayout = () => {
  return (
    <>
      <div style={{
        backgroundImage: "linear-gradient(to bottom, #050F2DFF 0%, black 100%)",
      }} className='text-white'>
      <Navbar/>
      <Outlet/>
      </div>
    </>
  )
}

export default RootLayout