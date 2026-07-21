import {
  BanknoteArrowDown,
  BanknoteArrowUpIcon,
  ChartNoAxesColumn,
  PiggyBank,
} from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useGetBalance } from '@/data/api/user'

import CardBalance from './card-balance'

const Balance = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data } = useGetBalance(from, to)
  return (
    <>
      <div className="col-span-2 grid grid-cols-[1fr,1fr] gap-5">
        <CardBalance data={data?.balance} title="Saldo" icon={<PiggyBank />} />
        <CardBalance
          data={data?.earnings}
          title="Ganhos"
          icon={<BanknoteArrowUpIcon />}
        />
        <CardBalance
          data={data?.expenses}
          title="Gastos"
          icon={<BanknoteArrowDown />}
        />
        <CardBalance
          data={data?.investments}
          title="Investimentos"
          icon={<ChartNoAxesColumn />}
        />
      </div>
    </>
  )
}

export default Balance
