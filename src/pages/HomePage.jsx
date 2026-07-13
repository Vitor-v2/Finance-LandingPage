import { Navigate } from 'react-router'

import Balance from '@/components/balance'
import ChartTransaction from '@/components/chart-transaction'
import Header from '@/components/header'
import ButtonTransaction from '@/components/new-transaction-button'
import PickCalendar from '@/components/pickdate-calendar'
import Transactions from '@/components/transaction-table'
import { useAuthContext } from '@/context/useAuthContext'

const HomePage = () => {
  const { user, initializing } = useAuthContext()
  if (initializing) return null
  if (!user) {
    return <Navigate to="/Login" />
  }
  return (
    <>
      <Header />
      <div className="flex items-center justify-between p-4">
        <h2 className="text-2xl">DashBoard</h2>
        <div className="flex gap-5">
          <PickCalendar />
          <ButtonTransaction />
        </div>
      </div>
      <div className="grid grid-cols-1">
        <Balance className="grid-span-1" />
      </div>
      <Transactions />
    </>
  )
}

export default HomePage
