import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Layout from './Layout'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if(!localStorage.getItem('auth')){
      navigate('/login')
    }
    
  }, [])
  return (
    <Layout>
      <div className="container">

      <h3>DashBoard</h3>
      <div className='text-center'>Welcome to Admin Panel</div>
      </div>
    </Layout>
  )
}

export default HomePage
