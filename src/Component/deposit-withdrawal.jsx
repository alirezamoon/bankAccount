import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const DepositWithdrawal = () => {
  const { accountId } = useParams()
  const [amount, setAmount] = useState('')
  const [isDeposit, setIsDeposit] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const apiUrl = isDeposit
      ? `https://example.com/api/accounts/${accountId}/deposit`
      : `https://example.com/api/accounts/${accountId}/withdrawal`

    try {
      await axios.post(apiUrl, { amount })
      toast.success(`${isDeposit ? 'Deposit' : 'Withdrawal'} successful!`)
      navigate('/dashboard/accounts')
    } catch (error) {
      toast.error(`Failed to ${isDeposit ? 'deposit' : 'withdraw'}.`)
    }
  }

  return (
    <div className='w-full flex items-center justify-center'>
      <div className='w-full max-w-lg'>
        <h2 className='text-2xl mb-4'>
          {isDeposit ? 'Deposit' : 'Withdrawal'}
        </h2>
        <form
          onSubmit={handleSubmit}
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Amount
            </label>
            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter amount'
            />
          </div>
          <div className='flex items-center mb-4'>
            <label className='mr-4'>
              <input
                type='radio'
                checked={isDeposit}
                onChange={() => setIsDeposit(true)}
              />
              Deposit
            </label>
            <label>
              <input
                type='radio'
                checked={!isDeposit}
                onChange={() => setIsDeposit(false)}
              />
              Withdrawal
            </label>
          </div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DepositWithdrawal
