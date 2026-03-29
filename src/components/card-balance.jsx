import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const CardBalance = ({ data, title, icon }) => {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <div className="flex items-center gap-2">
            {icon}
            <h1 className="text-lg">{title}</h1>
          </div>
          <CardTitle className="text-2xl">
            {Intl.NumberFormat('pt-br', {
              style: 'currency',
              currency: 'BRL',
            }).format(data)}
          </CardTitle>
        </CardHeader>
      </CardContent>
    </Card>
  )
}

export default CardBalance
