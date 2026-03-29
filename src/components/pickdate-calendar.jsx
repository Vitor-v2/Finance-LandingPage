import { useQueryClient } from '@tanstack/react-query'
import { addMonths, format, isValid } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { useAuthContext } from '@/context/useAuthContext'

import { DatePickerWithRange } from './ui/calendar-range'

export const PickCalendar = () => {
  const [searchParams] = useSearchParams()
  const { user } = useAuthContext()
  const queryClient = useQueryClient()

  const validateDate = (dateParam) => {
    const fromDate = dateParam.get('from')
    const toDate = dateParam.get('to')
    const defaultDate = {
      from: new Date(),
      to: addMonths(new Date(), 1),
    }

    if (!fromDate || !toDate) return defaultDate
    if (!isValid(fromDate) && !isValid(toDate)) return defaultDate
    return {
      from: new Date(searchParams.get('from') + 'T03:00:00'),
      to: new Date(searchParams.get('to') + 'T03:00:00'),
    }
  }

  const [date, setDate] = useState(validateDate(searchParams))

  const navigate = useNavigate()

  const formatDate = (date) => format(date, 'yyyy-MM-dd')

  useEffect(() => {
    if (!date.from || !date.to) return
    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDate(date.from))
    queryParams.set('to', formatDate(date.to))
    navigate(`/?${queryParams.toString()}`)
    queryClient.invalidateQueries({ queryKey: ['balance', user.id] })
  }, [navigate, date, queryClient, user])

  return <DatePickerWithRange value={date} onChange={setDate} />
}
export default PickCalendar
