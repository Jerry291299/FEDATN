import React from 'react'
import Navbar from '../components/admin/Navbar'
import Dashboard from '../components/admin/Dashboard'

type Props = {}

const Admin = (props: Props) => {
  return (
    <>
    <div className="flex justify-between">
    <Navbar/>
    <Dashboard/>
  
    </div>
    
  </>
  )
}

export default Admin