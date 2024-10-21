import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSignIn = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        'https://example.com/api/login',
        credentials
      )
      toast.success('Login successful!')
      navigate('/dashboard/profile')
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please try again.'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='w-full max-w-xs'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          {['username', 'password'].map((field) => (
            <div key={field} className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={credentials[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              />
            </div>
          ))}
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type='button'
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className='flex flex-col items-center'>
          <p className='text-gray-600 text-sm mb-2'>
            Don't have an account? Sign up now!
          </p>
          <button
            className='hover:bg-blue-50 text-blue-500 border border-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
