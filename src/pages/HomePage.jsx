import { Navigate } from 'react-router'

import Balance from '@/components/balance'
import Header from '@/components/Header'
import ButtonTransaction from '@/components/new-transaction-button'
import PickCalendar from '@/components/pickdate-calendar'
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
      <div>
        <Balance />
      </div>
    </>
  )
}

export default HomePage
