import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AccountForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [accountData, setAccountData] = useState({
    accountNumber: '',
    balance: '',
    creationDate: '',
    iban: '',
  })

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `https://example.com/api/accounts/${id}`
          )
          setAccountData(response.data)
        }
      } catch (error) {
        toast.error('Failed to fetch account details.')
      }
    }
    fetchAccountData()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setAccountData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (id) {
        await axios.put(`https://example.com/api/accounts/${id}`, accountData)
        toast.success('Account updated successfully!')
      } else {
        await axios.post('https://example.com/api/accounts', accountData)
        toast.success('Account added successfully!')
      }
      navigate('/dashboard/accounts')
    } catch (error) {
      toast.error('Failed to save account.')
    }
  }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      >
        <h2 className='text-xl font-bold mb-4'>
          {id ? 'Edit Account' : 'Add New Account'}
        </h2>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Account Number
          </label>
          <input
            name='accountNumber'
            value={accountData.accountNumber}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='Account Number'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Account Balance
          </label>
          <input
            name='balance'
            value={accountData.balance}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='number'
            placeholder='Account Balance'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Creation Date
          </label>
          <input
            name='creationDate'
            value={accountData.creationDate}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='date'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            IBAN
          </label>
          <input
            name='iban'
            value={accountData.iban}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='IBAN'
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            {id ? 'Update Account' : 'Add Account'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AccountForm
