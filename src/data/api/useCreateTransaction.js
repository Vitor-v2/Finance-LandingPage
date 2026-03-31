import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuthContext } from '@/context/useAuthContext'
import { transactionServices } from '@/services'

import { queryKeyGetBalance } from './user'

const useCreateTransaction = () => {
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

export default useCreateTransaction
