import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { loginSchema, singUpSchema } from '../schema/user'

export const useLoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  return { form }
}

export const useSignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(singUpSchema),
    defaultValues: {
      firstName: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    mode: 'onBlur',
  })
  return { form }
}
