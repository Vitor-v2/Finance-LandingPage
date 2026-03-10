import { Plus } from 'lucide-react'
import { Navigate } from 'react-router'

import Header from '@/components/Header'
import PickCalendar from '@/components/pickdate-calendar'
import { Button } from '@/components/ui/button'
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
          <Button variant="submitButton" className="rounded-5">
            Nova transação <Plus />{' '}
          </Button>
        </div>
      </div>
    </>
  )
}

export default HomePage
