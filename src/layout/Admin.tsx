import React from 'react'
import Navbar from '../components/admin/Navbar'
import Dashboard from '../components/admin/Dashboard'

type Props = {}

const Admin = (props: Props) => {
  return (
    <>
   <div className="flex">
  {/* Sidebar */}
  <div className="w-[260px] h-screen fixed top-0 left-0 z-50 bg-gray-900">
    <Navbar />
  </div>

  {/* Main content */}
  <div className="ml-[300px] w-full">
    <Dashboard />
  </div>
</div>
  </>
  )
}

export default Admin