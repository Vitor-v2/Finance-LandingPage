import { useMutation, useQuery } from '@tanstack/react-query'

import { useAuthContext } from '@/context/useAuthContext'
import { userServices } from '@/services'

export const queryKeyGetBalance = ({ userId, from, to }) => {
  if (from && to) return ['balance', userId, from, to]
  return ['balance', userId]
}

export const useGetBalance = (from, to) => {
  const { user } = useAuthContext()
  console.log(user)
  return useQuery({
    queryKey: queryKeyGetBalance({ userId: user.id, from, to }),
    queryFn: () => {
      return userServices.getBalance({ from, to })
    },
    staleTime: 1000 * 60 * 1,
    enabled: Boolean(user.id) && Boolean(from) && Boolean(to),
  })
}

export const useSignUp = () => {
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = userServices.signIn(variables)
      return response
    },
  })
}

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (data) => {
      const response = userServices.login(data)
      return response
    },
  })
}
