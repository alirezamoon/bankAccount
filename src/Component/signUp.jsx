import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignUp = () => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    militaryStatus: '',
    email: '',
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSignUp = async () => {
    setLoading(true)
    try {
      await axios.post('https://example.com/api/signup', formData)
      toast.success('Sign-up successful! You can now log in.')
      navigate('/dashboard/profile')
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Sign-up failed. Please try again.'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='w-full max-w-xs'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='mobileNumber'
            >
              Mobile Number
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='mobileNumber'
              type='text'
              name='mobileNumber'
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder='Mobile Number'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='firstName'
            >
              First Name
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='firstName'
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              placeholder='First Name'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='lastName'
            >
              Last Name
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='lastName'
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              placeholder='Last Name'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='dateOfBirth'
            >
              Date of Birth
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='dateOfBirth'
              type='date'
              name='dateOfBirth'
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='gender'
            >
              Gender
            </label>
            <select
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='gender'
              name='gender'
              value={formData.gender}
              onChange={handleChange}
            >
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='militaryStatus'
            >
              Military Status
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='militaryStatus'
              type='text'
              name='militaryStatus'
              value={formData.militaryStatus}
              onChange={handleChange}
              placeholder='Military Status'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
            />
          </div>
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type='button'
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? <span className='loader'></span> : 'Sign Up'}
          </button>
        </form>
        <div className='flex flex-col items-center'>
          <p className='text-gray-600 text-sm mb-2'>
            Already have an account? Log in here!
          </p>
          <button
            className='hover:bg-blue-50 text-blue-500 border border-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={() => navigate('/login')}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp
