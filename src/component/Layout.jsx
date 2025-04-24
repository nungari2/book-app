import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {children}
      </main>
        <Navbar/>

        <Outlet/>

        <Footer/>

    </div>
  )
}
