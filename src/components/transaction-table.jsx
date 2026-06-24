import { useSearchParams } from 'react-router'

import { useGetTransactions } from '@/data/api/transaction'

import { DataTable } from './ui/data-tabel'

const columns = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
  },
  {
    accessorKey: 'date',
    header: 'Data',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'actions',
    header: 'Ação',
  },
]

const Transactions = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data } = useGetTransactions(from, to)
  console.log(data)
  return <div>{data ? <DataTable columns={columns} data={data} /> : null}</div>
}

export default Transactions
