import Navbar from '@/components/Navbar'
import React from 'react'
import Landing from './(nondashboard)/landing/page'

const page = () => {
  return (
    <div className='h-full w-full'>
      <Navbar />
      <main className='h-full w-full flex flex-col'>
        <Landing />
      </main>
    </div>
  )
}

export default page