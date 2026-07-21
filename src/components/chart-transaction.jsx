import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useSearchParams } from 'react-router'
import { Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useGetTransactions } from '@/data/api/transaction'

import DescriptionChart from './ui/description-chart'

const chartConfig = {
  amount: {
    label: 'Quantia',
  },
  Ganhos: {
    label: 'Ganhos R$ ',

    color: 'var(--chart-1)',
  },
  Investimentos: {
    label: 'Investimentos ',
    color: 'var(--chart-2)',
  },
  Gastos: {
    label: 'Gastos ',
    color: 'var(--chart-3)',
  },
}

const ChartTransaction = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const monthFrom = format(from, 'LLLL', { locale: ptBR }).toUpperCase()
  const monthTo = format(to, 'LLLL', { locale: ptBR }).toUpperCase()
  const { data: dataTransaction } = useGetTransactions(from, to)

  const defaultStructure = {
    EARNING: { transaction: 'Ganhos', amount: 0, fill: 'var(--color-Ganhos)' },
    INVESTMENT: {
      transaction: 'Investimentos',
      amount: 0,
      fill: 'var(--color-Investimentos)',
    },
    EXPENSE: { transaction: 'Gastos', amount: 0, fill: 'var(--color-Gastos)' },
  }

  for (let index = 0; index < dataTransaction?.length; index++) {
    const transaction = dataTransaction[index]
    if (defaultStructure[transaction?.type]) {
      defaultStructure[transaction.type].amount += parseFloat(
        transaction.amount
      )
    }
  }

  const chartData2 = Object.values(defaultStructure)
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Transações</CardTitle>
        <CardDescription>{`${monthFrom} até ${monthTo}`}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData2}
              dataKey="amount"
              nameKey="transaction"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex gap-5">
        <DescriptionChart description="Ganhos" variant="green" />
        <DescriptionChart description="Investimentos" variant="blue" />
        <DescriptionChart description="Gastos" variant="red" />
      </CardFooter>
    </Card>
  )
}

export default ChartTransaction
