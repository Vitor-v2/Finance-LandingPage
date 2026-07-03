import { PenLine, Trash } from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useGetTransactions } from '@/data/api/transaction'
import { AmountConvert } from '@/data/helpers/transaction-formater'

import { Button } from './ui/button'
import { DataTable } from './ui/data-tabel'
import { ScrollArea } from './ui/scroll-area'
import TransactionBadge from './ui/transaction-type-badge'

const columns = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      const transaction = row.original.type
      return <TransactionBadge variant={transaction.toLowerCase()} />
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row }) => {
      const data = new Date(row.getValue('date'))
      data.setDate(data.getDate() + 1)
      const dateFormated = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'long',
      }).format(new Date(data))
      return <p>{dateFormated}</p>
    },
  },
  {
    accessorKey: 'amount',
    header: 'Quantia',
    cell: ({ row }) => {
      const getValue = row.getValue('amount')
      const valueFormated = AmountConvert(getValue)
      return <p>{valueFormated}</p>
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ação',
    cell: () => {
      return (
        <div className="flex justify-center gap-3">
          <Button variant="outline" className="bg-transparent">
            <PenLine className="text-white" />
          </Button>
          <Button variant="outline" className="bg-transparent">
            <Trash className="text-white" />
          </Button>
        </div>
      )
    },
  },
]

const Transactions = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data } = useGetTransactions(from, to)
  return (
    <div>
      {data ? (
        <ScrollArea className="h-[300px] w-auto rounded-md">
          <DataTable columns={columns} data={data} />
        </ScrollArea>
      ) : null}
    </div>
  )
}

export default Transactions
