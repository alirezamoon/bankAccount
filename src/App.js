import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AccountForm from './Component/accountForm'
import Accounts from './Component/accounts'
import Dashboard from './Component/dashboard'
import DepositWithdrawal from './Component/deposit-withdrawal'
import Login from './Component/login'
import Profile from './Component/profile'
import SignUp from './Component/signUp'
import Transactions from './Component/transactions'

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='profile' element={<Profile />} />
          <Route path='accounts' element={<Accounts />} />
          <Route path='accounts/add' element={<AccountForm />} />{' '}
          <Route path='accounts/edit/:id' element={<AccountForm />} />{' '}
          <Route
            path='accounts/diposit-withdrawal'
            element={<DepositWithdrawal />}
          />
          <Route path='transactions' element={<Transactions />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
