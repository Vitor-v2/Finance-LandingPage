import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useSearchParams } from 'react-router'

import { useGetTransactions } from '@/data/api/transaction'
import { AmountConvert } from '@/data/helpers/transaction-formater'

import DeleteTrasactionButton from './delete-trasaction-button'
import EditTransactionButton from './edit-transaction-button'
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
      const dateCorrect = new Date(data)
      const dateFormated = format(
        dateCorrect.setHours(dateCorrect.getHours() + 3),
        "dd 'de' MMMM 'de' yyyy",
        { locale: ptBR }
      )
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
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="flex justify-center gap-5">
          <EditTransactionButton transaction={transaction} />
          <DeleteTrasactionButton transaction={transaction} />
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
        <ScrollArea className="mt-10 h-96 w-auto rounded-md">
          <DataTable columns={columns} data={data} />
        </ScrollArea>
      ) : null}
    </div>
  )
}

export default Transactions
