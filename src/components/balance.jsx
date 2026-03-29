import { useQuery } from '@tanstack/react-query'
import {
  BanknoteArrowDown,
  BanknoteArrowUpIcon,
  ChartNoAxesColumn,
  PiggyBank,
} from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useAuthContext } from '@/context/useAuthContext'
import { userServices } from '@/services'

import CardBalance from './card-balance'

const Balance = () => {
  const [searchParams] = useSearchParams()
  const { user } = useAuthContext()
  const { data } = useQuery({
    queryKey: ['balance', user.id],
    queryFn: () => {
      const from = searchParams.get('from')
      const to = searchParams.get('to')
      return userServices.getBalance({ from, to })
    },
  })

  return (
    <section className="grid grid-cols-2">
      <div className="grid grid-cols-[1fr,1fr] gap-5">
        <CardBalance
          data={data?.balance}
          title="Balance"
          icon={<PiggyBank />}
        />
        <CardBalance
          data={data?.earnings}
          title="earnings"
          icon={<BanknoteArrowUpIcon />}
        />
        <CardBalance
          data={data?.expenses}
          title="expenses"
          icon={<BanknoteArrowDown />}
        />
        <CardBalance
          data={data?.investments}
          title="investments"
          icon={<ChartNoAxesColumn />}
        />
      </div>
    </section>
  )
}

export default Balance
