import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { toast } from 'sonner'

import {
  ACCESS_TK_STORAGE,
  REFRESH_TK_STORAGE,
} from '@/constants/local-storage'
import { useLogin, useSignUp } from '@/data/api/user'
import { userServices } from '@/services'

import { AuthContext } from './useAuthContext'

const storeToken = (Token) => {
  localStorage.setItem(ACCESS_TK_STORAGE, Token.accessToken)
  localStorage.setItem(REFRESH_TK_STORAGE, Token.refreshToken)
}

const deleteTokens = () => {
  localStorage.removeItem(ACCESS_TK_STORAGE)
  localStorage.removeItem(REFRESH_TK_STORAGE)
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [initializing, setinitializing] = useState(true)

  const signUpMutation = useSignUp()
  const loginMutation = useLogin()

  const signUp = (data) => {
    signUpMutation.mutate(data, {
      onSuccess: (createdUser) => {
        storeToken(createdUser.tokens)
        setUser(createdUser)
        toast.success('usuário criado com sucesso')
      },
      onError: (error) =>
        toast.error(`Houve um erro, usuário não criado: ${error}`),
    })
  }

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (createdUser) => {
        storeToken(createdUser.tokens)
        setUser(createdUser)
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }

  useEffect(() => {
    const init = async () => {
      try {
        setinitializing(true)
        const accessToken = localStorage.getItem(ACCESS_TK_STORAGE)
        const refreshToken = localStorage.getItem(REFRESH_TK_STORAGE)
        if (!accessToken && !refreshToken) return
        const response = await userServices.me()
        setUser(response)
      } catch (error) {
        deleteTokens()
        console.log(error)
      } finally {
        setinitializing(false)
      }
    }
    init()
  }, [])

  const signOut = () => {
    setUser(null)
    deleteTokens()
  }

  return (
    <AuthContext.Provider
      value={{ user, login, signUp, initializing, signOut }}
    >
      {children || <Outlet />}
    </AuthContext.Provider>
  )
}
