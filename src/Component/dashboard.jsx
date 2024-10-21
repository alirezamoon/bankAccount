import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    toast.success('Successfully logged out!')
    navigate('/login')
  }

  return (
    <div className='flex'>
      <div className='sidebar w-64 bg-gray-200 h-screen'>
        <ul className='p-4'>
          <li className='mb-2'>
            <Link
              to='/dashboard/profile'
              className='text-gray-700 hover:text-blue-500'
            >
              Profile
            </Link>
          </li>
          <li className='mb-2'>
            <Link
              to='/dashboard/accounts'
              className='text-gray-700 hover:text-blue-500'
            >
              Accounts
            </Link>
          </li>
          <li className='mb-2'>
            <Link
              to='/dashboard/transactions'
              className='text-gray-700 hover:text-blue-500'
            >
              Transactions
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className='w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>

      <div className='flex-grow p-4'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
