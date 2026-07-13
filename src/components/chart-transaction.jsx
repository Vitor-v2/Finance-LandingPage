import { useSearchParams } from 'react-router'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useGetTransactions } from '@/data/api/transaction'

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
  { data: '27/07/2026', desktop: 12.0, tipo: 'investimento' },
]
const chartConfig = {
  desktop: {
    color: '#2563eb',
    label: 'teste',
  },
  valor: {
    label: 'valor:',
    color: 'var(--chart-1)',
  },
  tipo: {
    label: 'Tipo',
    color: 'var(--chart-2)',
  },
}

const ChartTransaction = ({ height }) => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data: dataTransaction } = useGetTransactions(from, to)
  console.log(dataTransaction)

  return (
    <Card className="w-full" style={{ height: `${height + 18}vh` }}>
      <CardHeader>
        <CardTitle>Transações</CardTitle>
        <CardDescription>Transações entre período</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full text-sm"
          style={{ height: `${height}vh` }}
        >
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="data"
              tickLine={false}
              axisLine={false}
              tickMargin={1}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ChartTransaction
