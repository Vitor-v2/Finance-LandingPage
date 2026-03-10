import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { DatePickerWithRange } from './ui/calendar-range'

export const PickCalendar = () => {
  const [searchParams] = useSearchParams()

  const [date, setDate] = useState({
    from: searchParams.get('from')
      ? new Date(searchParams.get('from') + 'T03:00:00')
      : new Date(),
    to: searchParams.get('to')
      ? new Date(searchParams.get('to') + 'T03:00:00')
      : new Date(new Date() + 1),
  })

  const navigate = useNavigate()

  const formatDate = (date) => format(date, 'yyyy-MM-dd')

  useEffect(() => {
    if (!date.from || !date.to) return
    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDate(date.from))
    queryParams.set('to', formatDate(date.to))
    if (date.from && date.to) {
      navigate(`/?${queryParams.toString()}`)
    }
  }, [navigate, date])

  return <DatePickerWithRange value={date} onChange={setDate} />
}
export default PickCalendar
