import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useUpdateTransaction } from '@/data/api/transaction'

import { newTransactionSchema, schemaUpdate } from '../schema/transaction'

export const useValidateNewTransaction = () => {
  const form = useForm({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      nameTransaction: '',
      valueTransaction: '',
      typeTransaction: '',
      dateTransaction: '',
    },
    mode: 'onBlur',
    shouldUnregister: true,
  })
  return { form }
}

export const useValidateUpdate = ({ transaction, onSucess, onError }) => {
  const { mutateAsync: updateData } = useUpdateTransaction()

  const form = useForm({
    resolver: zodResolver(schemaUpdate),
    defaultValues: {
      id: transaction.id,
      nameTransaction: transaction.name,
      valueTransaction: parseFloat(transaction.amount),
      typeTransaction: transaction.type,
      dateTransaction: new Date(transaction.date),
    },
    mode: 'onBlur',
    //shouldUnresgister: definir como true os valroes dos inputs são removidos quando componente for desmontado
    shouldUnregister: true,
  })

  //inserção do id no form
  useEffect(() => {
    form.reset({
      id: transaction.id,
      nameTransaction: transaction.name,
      valueTransaction: parseFloat(transaction.amount),
      typeTransaction: transaction.type,
      dateTransaction: new Date(transaction.date),
    })
    form.setValue('id', transaction.id)
  }, [form, transaction])

  const onSubmit = async (data) => {
    try {
      await updateData(data)
      onSucess()
    } catch (error) {
      return onError(error)
    }
  }
  return { form, onSubmit }
}
