import { cva } from 'class-variance-authority'
import { Dot } from 'lucide-react'
import * as React from 'react'

const variants = cva(
  'inline-flex items-center rounded-md border px-2.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 gap-1',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-black text-white',
        expense:
          'border-transparent bg-destructive text-red-400 shadow hover:bg-destructive/80',
        investment:
          'border-transparent bg-blue-950 text-blue-500 dark:bg-blue-950 dark:text-blue-300',
        earning:
          'bg-green-950 text-green-500 dark:bg-green-950 dark:text-green-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const getOption = (variant) => {
  switch (variant) {
    case 'expense':
      return 'Despesa'
    case 'investment':
      return 'Investimento'
    case 'earning':
      return 'Ganho'
  }
}

const TransactionBadge = ({ variant }) => {
  return (
    <div className={variants({ variant })}>
      <Dot className="w-2 animate-pulse" strokeWidth={15} />
      <p className="text-sm">{getOption(variant)}</p>
    </div>
  )
}

export default TransactionBadge
