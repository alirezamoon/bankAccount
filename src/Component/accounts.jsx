import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Accounts = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true)
      try {
        const response = await axios.get('https://example.com/api/accounts')
        setAccounts(response.data)
      } catch (error) {
        toast.error('Failed to fetch accounts.')
      } finally {
        setLoading(false)
      }
    }

    fetchAccounts()
  }, [])

  const handleDelete = async (accountId) => {
    setLoading(true)
    try {
      await axios.delete(`https://example.com/api/accounts/${accountId}`)
      toast.success('Account deleted successfully!')
      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.id !== accountId)
      )
    } catch (error) {
      toast.error('Failed to delete account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full'>
      <h2 className='text-2xl mb-4'>Accounts</h2>
      <table className='min-w-full border border-gray-300'>
        <thead>
          <tr>
            <th className='border px-4 py-2'>Unique ID</th>
            <th className='border px-4 py-2'>Account Number</th>
            <th className='border px-4 py-2'>Account Balance</th>
            <th className='border px-4 py-2'>Account Creation Date</th>
            <th className='border px-4 py-2'>IBAN</th>
            <th className='border px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td className='border px-4 py-2'>{account.uniqueId}</td>
              <td className='border px-4 py-2'>{account.accountNumber}</td>
              <td className='border px-4 py-2'>{account.balance}</td>
              <td className='border px-4 py-2'>{account.creationDate}</td>
              <td className='border px-4 py-2'>{account.iban}</td>
              <td className='border px-4 py-2 flex space-x-2'>
                <Link to={`/dashboard/accounts/edit/${account.id}`}>
                  <button className='bg-blue-500 text-white px-4 py-2 rounded'>
                    Edit
                  </button>
                </Link>
                <button
                  className='bg-red-500 text-white px-4 py-2 rounded'
                  onClick={() => handleDelete(account.id)}
                >
                  Delete
                </button>
                <Link
                  to={`/dashboard/accounts/deposit-withdrawal/${account.id}`}
                >
                  <button className='bg-green-500 text-white px-4 py-2 rounded'>
                    Deposit/Withdrawal
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-end mt-4'>
        <Link to='/dashboard/accounts/add'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded'>
            Add New Account
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Accounts
