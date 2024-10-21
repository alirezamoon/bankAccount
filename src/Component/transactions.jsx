import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      try {
        const response = await axios.get('https://example.com/api/transactions')
        setTransactions(response.data)
      } catch (error) {
        toast.error('Failed to fetch transactions.')
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  return (
    <div className='w-full max-w-6xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Transactions</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='min-w-full border-collapse border border-gray-200'>
          <thead>
            <tr>
              <th className='border border-gray-200 px-4 py-2'>Account ID</th>
              <th className='border border-gray-200 px-4 py-2'>
                Transaction Type
              </th>
              <th className='border border-gray-200 px-4 py-2'>Amount</th>
              <th className='border border-gray-200 px-4 py-2'>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className='border border-gray-200 px-4 py-2'>
                  {transaction.accountId}
                </td>
                <td className='border border-gray-200 px-4 py-2'>
                  {transaction.type}
                </td>
                <td className='border border-gray-200 px-4 py-2'>
                  {transaction.amount}
                </td>
                <td className='border border-gray-200 px-4 py-2'>
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Transactions
