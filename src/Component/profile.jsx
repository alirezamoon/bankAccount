import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    mobileNumber: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    militaryStatus: '',
    email: '',
  })

  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoadingUpdate(true)
      try {
        const response = await axios.get('https://example.com/api/profile')
        setUserInfo(response.data)
      } catch (error) {
        toast.error('Failed to fetch user information.')
      } finally {
        setLoadingUpdate(false)
      }
    }

    fetchUserInfo()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async () => {
    setLoadingUpdate(true)
    try {
      await axios.put('https://example.com/api/profile', userInfo)
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile.')
    } finally {
      setLoadingUpdate(false)
    }
  }

  const handleDeleteAccount = async () => {
    setLoadingDelete(true)
    try {
      await axios.delete('https://example.com/api/profile')
      toast.success('Account deleted successfully!')
      navigate('/')
    } catch (error) {
      toast.error('Failed to delete account.')
    } finally {
      setLoadingDelete(false)
    }
  }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='w-full max-w-lg'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Mobile Number
            </label>
            <input
              name='mobileNumber'
              value={userInfo.mobileNumber}
              onChange={handleChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Mobile Number'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              First Name
            </label>
            <input
              name='firstName'
              value={userInfo.firstName}
              onChange={handleChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='First Name'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Last Name
            </label>
            <input
              name='lastName'
              value={userInfo.lastName}
              onChange={handleChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Last Name'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Date of Birth
            </label>
            <input
              name='dateOfBirth'
              value={userInfo.dateOfBirth}
              onChange={handleChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='date'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Gender
            </label>
            <select
              name='gender'
              value={userInfo.gender}
              onChange={handleChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            >
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Military Status
            </label>
            <input
              name='militaryStatus'
              value={userInfo.militaryStatus}
              onChange={handleChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Military Status'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Email
            </label>
            <input
              name='email'
              value={userInfo.email}
              onChange={handleChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='email'
              placeholder='Email'
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                loadingUpdate ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              type='button'
              onClick={handleUpdate}
              disabled={loadingUpdate}
            >
              {loadingUpdate ? 'Updating...' : 'Update Profile'}
            </button>
            <button
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                loadingDelete ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              type='button'
              onClick={handleDeleteAccount}
              disabled={loadingDelete}
            >
              {loadingDelete ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
