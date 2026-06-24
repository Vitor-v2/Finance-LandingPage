import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useAuthContext } from '@/context/useAuthContext'
import {
  getAllTransactions,
  transactionServices,
} from '@/data/api/services/services'

import { queryKeyGetBalance } from './user'

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  return useMutation({
    mutationKey: ['createTransaction'],
    mutationFn: async (data) => {
      const response = await transactionServices.create(data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyGetBalance(user.id) })
    },
  })
}

export const queryKeyGetTransactions = ({ userId, from, to }) => {
  if (from && to) return ['balance', userId, from, to]
  return ['balance', userId]
}

export const useGetTransactions = (from, to) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: queryKeyGetTransactions({ userId: user.id, from, to }),
    queryFn: () => {
      return getAllTransactions(from, to)
    },
    enabled: Boolean(user.id) && Boolean(from) && Boolean(to),
  })
}
